﻿using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using szoftArch_hazi.Data;
using szoftArch_hazi.Data.Entities;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private ApplicationDbContext Context { get; }

        private UserManager<User> UserManager { get; }
        private SignInManager<User> SignInManager { get; }

        public AuthenticationService(ApplicationDbContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            Context = context;
        }

        public async Task<IdentityResult> Register(LoginModel model)
        {
            if (Context.Users.Any(f => f.Email == model.Email))
            {
                return IdentityResult.Failed();
            }
            var user = new User
            {
                Email = model.Email.Trim(),
                UserName = model.UserName.Trim()
            };

            var result = await UserManager.CreateAsync(user, model.Password);
            await Context.SaveChangesAsync();
            return result;
        }
        public async Task<string> Login(LoginModel model)
        {
            var user = Context.Users.SingleOrDefault(x => x.UserName == model.UserName);

            if (user == null)
                return null;

            SignInResult login = await SignInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);

            if (login == SignInResult.Failed)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("development-secret-key");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //Issuer = "",
                //Audience = "",
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task Logout()
        {
            await SignInManager.SignOutAsync();
        }

    }
}