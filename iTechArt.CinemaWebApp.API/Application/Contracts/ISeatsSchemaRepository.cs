using System.Collections.Generic;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface ISeatsSchemaRepository
    {
        Task CreateSeatAsync(SeatsSchema seatsSchema);
        Task<IEnumerable<SeatsSchema>> GetSeatsAsync(SeatSchemaParameters seatSchemaParameters);
        void DeleteSeat(SeatsSchema seatsSchema);
    }
}