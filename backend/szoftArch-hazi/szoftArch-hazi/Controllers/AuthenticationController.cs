﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using szoftArch_hazi.Models;
using szoftArch_hazi.Services;

namespace szoftArch_hazi.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public IAuthenticationService AuthenticationService { get; }
        public AuthenticationController(IAuthenticationService service)
        {
            AuthenticationService = service;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(LoginModel model)
        {
            var result = await AuthenticationService.Register(model);
            if (result.Succeeded)
                return Ok();
            else
                return BadRequest();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<string> Login(LoginModel model)
           => await AuthenticationService.Login(model);

        [HttpPost("logout")]
        [AllowAnonymous]
        public async Task Logout()
            => await AuthenticationService.Logout();
    }
}
