using iTechArt.CinemaWebApp.API.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iTechArt.CinemaWebApp.API.Application.Interfaces
{
    public interface IAccountService
    {
        public Task<LoginResponse> LoginAsync(LoginRequest request);
        Task<bool?> RegisterAsync(RegisterRequest request);
    }
}
