using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using iTechArt.CinemaWebApp.API.Application.DTOs;
using iTechArt.CinemaWebApp.API.Application.Services;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginRequest request)
        {
            if (!ModelState.IsValid) return BadRequest("Incorrect request body.");
            return Ok(await _accountService.LoginAsync(request));
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterRequest request)
        {
            if (!ModelState.IsValid) return BadRequest("Incorrect request body.");
            return Ok(await _accountService.RegisterAsync(request));
        }
    }
}