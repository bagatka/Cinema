using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync(bool trackChanges);
        Task<User> GetUserByEmailAsync(string userEmail, bool trackChanges);
        Task<User> GetUserByUsernameAsync(string username, bool trackChanges);
        Task CreateUserAsync(User user);
    }
}