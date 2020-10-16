using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class ShowRepository : RepositoryBase<Show>, IShowRepository
    {
        public ShowRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }


        public async Task<IEnumerable<Show>> GetAllShows(bool trackChanges)
        {
            return await FindAll(trackChanges)
                .OrderBy(show => show.Film.Title)
                .ToListAsync();
        }

        public async Task<Show> GetShow(int showId, bool trackChanges)
        {
            return await FindByCondition(show => show.Id.Equals(showId), trackChanges)
                .SingleOrDefaultAsync();
        }
    }
}