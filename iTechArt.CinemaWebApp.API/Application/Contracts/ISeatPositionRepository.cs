using System.Collections.Generic;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface ISeatPositionRepository
    {
        Task CreateSeatAsync(SeatPosition seatPosition);
        Task<IEnumerable<SeatPosition>> GetSeatsAsync(SeatPositionParameters seatPositionParameters);
        void DeleteSeat(SeatPosition seatPosition);
    }
}