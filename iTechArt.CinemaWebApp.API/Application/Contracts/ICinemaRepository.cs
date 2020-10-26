using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface ICinemaRepository
    {
        Task<PagedList<Cinema>> GetAllCinemasAsync(CinemaParameters cinemaParameters);
        Task<Cinema> GetCinemaAsync(int cinemaId);
        Task CreateCinemaAsync(Cinema cinema);
        void DeleteCinema(Cinema cinema);
    }
}