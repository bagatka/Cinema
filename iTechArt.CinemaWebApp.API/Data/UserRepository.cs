using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<User>> GetUsersAsync(UserParameters userParameters)
        {
            var users = FindAll()
                .AsNoTracking()
                .OrderBy(user => user.UserName);

            return await PagedList<User>.ToPagedList(users, userParameters.PageNumber, userParameters.PageSize);
        }

        public async Task<User> GetUserByEmailAsync(string userEmail)
        {
            return await FindByCondition(user => user.Email.Equals(userEmail))
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await FindByCondition(user => user.UserName.Equals(username))
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

        public async Task CreateUserAsync(User user) => await CreateAsync(user);
    }
}