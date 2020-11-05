using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IUserRepository
    {
        Task<PagedList<User>> GetUsersAsync(UserParameters userParameters);
        Task<User> GetUserByEmailAsync(string userEmail);
        Task<User> GetUserByUsernameAsync(string username);
        Task CreateUserAsync(User user);
    }
}