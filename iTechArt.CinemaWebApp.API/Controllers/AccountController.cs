using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Data;
using iTechArt.CinemaWebApp.API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace iTechArt.CinemaWebApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly CinemaDbContext _context;
        private readonly IConfiguration _config;

        public AccountController(CinemaDbContext cinemaDbContext, IConfiguration configuration)
        {
            _context = cinemaDbContext;
            _config = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            User account = AuthenticateAccount(login);
        }

        private User AuthenticateAccount(User loginCredentials)
        {
            User account = _context.Users.FirstOrDefault();
            return account;
        }
    }
}
