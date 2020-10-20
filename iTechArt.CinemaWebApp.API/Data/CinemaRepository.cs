using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class CinemaRepository : RepositoryBase<Cinema>, ICinemaRepository
    {
        public CinemaRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<Cinema>> GetAllCinemasAsync(CinemaParameters cinemaParameters, bool trackChanges)
        {
            var cinemas = await FindAll(trackChanges)
                .OrderBy(cinema => cinema.Name)
                .ToListAsync();
            
            return PagedList<Cinema>.ToPagedList(cinemas, cinemaParameters.PageNumber, cinemaParameters.PageSize);
        }

        public async Task<Cinema> GetCinemaAsync(int cinemaId, bool trackChanges)
        {
            return await FindByCondition(cinema => cinema.Id.Equals(cinemaId), trackChanges)
                .SingleOrDefaultAsync();
        }

        public async Task CreateCinemaAsync(Cinema cinema) => await CreateAsync(cinema);

        public void DeleteCinema(Cinema cinema) => Delete(cinema);
    }
}