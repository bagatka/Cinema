using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

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
                .Include(hall => hall.SeatPositions)
                    .ThenInclude(seatPosition => seatPosition.SeatType)
                .Include(hall => hall.HallServices)
                .Include(hall => hall.Shows)
                .AsNoTracking();

            if (!string.IsNullOrEmpty(hallParameters.CinemaName))
            {
                halls = halls.Where(hall => hall.Cinema.Name.ToLower().Contains(hallParameters.CinemaName.ToLower()));
            }

            if (hallParameters.CinemaId != null)
            {
                halls = halls.Where(hall => hall.CinemaId.Equals(hallParameters.CinemaId));
            }

            return await PagedList<Hall>.ToPagedList(
                halls.OrderBy(hall => hall.Name),
                hallParameters.PageNumber,
                hallParameters.PageSize
            );
        }

        public Task<Hall> GetHallAsync(int id)
        {
            return FindByCondition(hall => hall.Id.Equals(id))
                .Include(hall => hall.SeatPositions)
                    .ThenInclude(seatPosition => seatPosition.SeatType)
                .Include(hall => hall.HallServices)
                    .ThenInclude(hallService => hallService.Service)
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

        public async Task CreateHallAsync(Hall hall) => await CreateAsync(hall);
        
        public void DeleteHall(Hall hall) => Delete(hall);
    }
}