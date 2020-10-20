using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class ShowRepository : RepositoryBase<Show>, IShowRepository
    {
        public ShowRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Show>> GetAllShowsAsync(ShowParameters showParameters, bool trackChanges)
        {
            var shows = await FindAll(trackChanges)
                .OrderBy(show => show.Film.Title)
                .ToListAsync();

            return PagedList<Show>.ToPagedList(shows, showParameters.PageNumber, showParameters.PageSize);
        }

        public async Task<Show> GetShowAsync(int showId, bool trackChanges)
        {
            return await FindByCondition(show => show.Id.Equals(showId), trackChanges)
                .SingleOrDefaultAsync();
        }
        
        public async Task CreateShowAsync(Show show) => await CreateAsync(show);
        
        public void DeleteShow(Show show) => Delete(show);
    }
}