using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class SeatsSchemaRepository : RepositoryBase<SeatsSchema>, ISeatsSchemaRepository
    {
        public SeatsSchemaRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
        
        public async Task CreateSeatAsync(SeatsSchema seatsSchema) => await CreateAsync(seatsSchema);

        public async Task<IEnumerable<SeatsSchema>> GetSeatsAsync(SeatSchemaParameters seatSchemaParameters)
        {
            var seats = FindAll()
                .AsNoTracking();

            if (seatSchemaParameters.SeatIds != null)
            {
                seats = seats.Where(seat => seatSchemaParameters.SeatIds.Contains(seat.Id));
            }

            return await seats.ToListAsync();
        }
        
        public void DeleteSeat(SeatsSchema seatsSchema) => Delete(seatsSchema);
    }
}