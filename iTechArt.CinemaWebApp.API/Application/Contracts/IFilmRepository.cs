using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IFilmRepository
    {
        Task<PagedList<Film>> GetAllFilmsAsync(FilmParameters filmParameters, bool trackChanges);
        Task<Film> GetFilmAsync(int filmId, bool trackChanges);
        Task CreateFilmAsync(Film film);
        void DeleteFilm(Film film);
    }
}