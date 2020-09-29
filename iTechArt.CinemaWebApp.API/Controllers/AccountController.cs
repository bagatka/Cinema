using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using iTechArt.CinemaWebApp.API.Application.Interfaces;
using iTechArt.CinemaWebApp.API.Application.DTOs;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginRequest request)
        {
            var response = await _accountService.LoginAsync(request);
            if (response == null)
            {
                return BadRequest();
            }
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterRequest request)
        {
            var response = await _accountService.RegisterAsync(request);

            if (response == null || response == false)
            {
                return BadRequest();
            }

            return Ok(response);
        }
    }
}
