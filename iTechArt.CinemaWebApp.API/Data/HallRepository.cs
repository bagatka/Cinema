using System.Linq;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class HallRepository : RepositoryBase<Hall>, IHallRepository
    {
        public HallRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<Hall>> GetHallsAsync(HallParameters hallParameters)
        {
            var halls = FindAll()
                .Include(hall => hall.Cinema)
                .Include(hall => hall.SeatsSchemas)
                .Include(hall => hall.HallServices)
                .Include(hall => hall.Shows)
                .AsNoTracking();

            if (!string.IsNullOrEmpty(hallParameters.CinemaName))
            {
                halls = halls.Where(hall => hall.Cinema.Name.ToLower().Contains(hallParameters.CinemaName.ToLower()));
            }

            if (hallParameters.CinemaId != -1)
            {
                halls = halls.Where(hall => hall.CinemaId == hallParameters.CinemaId);
            }

            return PagedList<Hall>.ToPagedList(
                await halls.OrderBy(hall => hall.Name).ToListAsync(),
                hallParameters.PageNumber,
                hallParameters.PageSize
            );
        }
        
        public async Task CreateHallAsync(Hall hall) => await CreateAsync(hall);
        
        public void DeleteHall(Hall hall) => Delete(hall);
    }
}