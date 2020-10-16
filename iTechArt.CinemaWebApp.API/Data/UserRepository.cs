using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                .OrderBy(user => user.UserName)
                .ToListAsync();
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