using System.Collections.Generic;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IFilmRepository
    {
        Task<IEnumerable<Film>> GetAllFilmsAsync(bool trackChanges);
        Task<Film> GetFilmAsync(int filmId, bool trackChanges);
    }
}