using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using szoftArch_hazi.Models;

namespace szoftArch_hazi.Services
{
    public interface IAuthenticationService
    {
        Task<IdentityResult> Register(LoginModel model);
        Task<string> Login(LoginModel model);
        Task Logout();
    }
}