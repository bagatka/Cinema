using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class SeatPositionRepository : RepositoryBase<SeatPosition>, ISeatPositionRepository
    {
        public SeatPositionRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
        
        public async Task CreateSeatAsync(SeatPosition seatPosition) => await CreateAsync(seatPosition);

        public async Task<IEnumerable<SeatPosition>> GetSeatsAsync(SeatPositionParameters seatPositionParameters)
        {
            var seats = FindAll()
                .AsNoTracking();

            if (seatPositionParameters.SeatIds != null)
            {
                seats = seats.Where(seat => seatPositionParameters.SeatIds.Contains(seat.Id));
            }

            return await seats.ToListAsync();
        }
        
        public void DeleteSeat(SeatPosition seatPosition) => Delete(seatPosition);
    }
}