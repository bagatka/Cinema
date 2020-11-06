using System.Collections.Generic;
using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface ICinemaRepository
    {
        Task<PagedList<Cinema>> GetCinemasAsync(CinemaParameters cinemaParameters);
        Task<Cinema> GetCinemaAsync(int cinemaId);
        Task<IEnumerable<string>> GetCinemaCities();
        Task CreateCinemaAsync(Cinema cinema);
        void UpdateCinema(Cinema cinema);
        void DeleteCinema(Cinema cinema);
    }
}