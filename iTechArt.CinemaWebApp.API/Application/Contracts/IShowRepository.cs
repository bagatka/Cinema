using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IShowRepository
    {
        Task<IEnumerable<Show>> GetAllShows(bool trackChanges);
        Task<Show> GetShow(int showId, bool trackChanges);
    }
}