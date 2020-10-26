using System.Collections.Generic;
using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IShowRepository
    {
        Task<IEnumerable<Show>> GetShowsAsync(ShowParameters showParameters);
        Task<Show> GetShowAsync(int showId);
        Task CreateShowAsync(Show show);
        void DeleteShow(Show show);
    }
}