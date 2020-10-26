using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IHallRepository
    {
        Task CreateHallAsync(Hall hall);
        void DeleteHall(Hall hall);
    }
}