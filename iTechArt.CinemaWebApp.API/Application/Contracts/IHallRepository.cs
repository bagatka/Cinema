using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IHallRepository
    {
        Task<PagedList<Hall>> GetHallsAsync(HallParameters hallParameters);
        Task<Hall> GetHallAsync(int id);
        Task CreateHallAsync(Hall hall);
        void DeleteHall(Hall hall);
    }
}