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

        public async Task<PagedList<User>> GetUsersAsync(UserParameters userParameters, bool trackChanges)
        {
            var users = await FindAll(trackChanges)
                .OrderBy(user => user.UserName)
                .ToListAsync();

            return PagedList<User>.ToPagedList(users, userParameters.PageNumber, userParameters.PageSize);
        }

        public async Task<User> GetUserByEmailAsync(string userEmail, bool trackChanges)
        {
            return await FindByCondition(user => user.Email.Equals(userEmail), trackChanges)
                .SingleOrDefaultAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username, bool trackChanges)
        {
            return await FindByCondition(user => user.UserName.Equals(username), trackChanges)
                .SingleOrDefaultAsync();
        }

        public async Task CreateUserAsync(User user) => await CreateAsync(user);
    }
}