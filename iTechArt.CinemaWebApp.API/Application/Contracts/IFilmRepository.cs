using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IFilmRepository
    {
        Task<PagedList<Film>> GetFilmsAsync(FilmParameters filmParameters);
        Task<Film> GetFilmAsync(int filmId);
        Task CreateFilmAsync(Film film);
        void DeleteFilm(Film film);
    }
}