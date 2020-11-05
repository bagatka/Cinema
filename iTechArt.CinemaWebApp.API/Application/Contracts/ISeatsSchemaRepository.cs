using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface ISeatsSchemaRepository
    {
        Task CreateSeatAsync(SeatsSchema seatsSchema);
        void DeleteSeat(SeatsSchema seatsSchema);
    }
}