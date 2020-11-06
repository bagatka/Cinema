using System.Collections.Generic;
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

        public async Task<PagedList<Cinema>> GetCinemasAsync(CinemaParameters cinemaParameters)
        {
            var cinemas = FindAll().AsNoTracking();
            
            if (!string.IsNullOrEmpty(cinemaParameters.Name))
            {
                cinemas = cinemas.Where(cinema => cinema.Name.ToLower().Contains(cinemaParameters.Name.ToLower()));
            }

            if (!string.IsNullOrEmpty(cinemaParameters.City))
            {
                cinemas = cinemas.Where(cinema => cinema.City.ToLower().Contains(cinemaParameters.City.ToLower()));
            }

            return await PagedList<Cinema>.ToPagedList(
                cinemas.OrderBy(cinema => cinema.Name),
                cinemaParameters.PageNumber,
                cinemaParameters.PageSize
            );
        }

        public async Task<Cinema> GetCinemaAsync(int cinemaId)
        {
            return await FindByCondition(cinema => cinema.Id.Equals(cinemaId))
                .Include(cinema => cinema.Halls)
                    .ThenInclude(hall => hall.SeatsSchemas)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<string>> GetCinemaCities()
        {
            return await FindAll()
                .Select(cinema => cinema.City)
                .Distinct() 
                .ToListAsync();
        }

        public async Task CreateCinemaAsync(Cinema cinema) => await CreateAsync(cinema);

        public void UpdateCinema(Cinema cinema) => Update(cinema);
        
        public void DeleteCinema(Cinema cinema) => Delete(cinema);
    }
}