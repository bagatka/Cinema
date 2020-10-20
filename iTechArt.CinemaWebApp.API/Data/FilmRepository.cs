using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class FilmRepository : RepositoryBase<Film>, IFilmRepository
    {
        public FilmRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<Film>> GetAllFilmsAsync(FilmParameters filmParameters, bool trackChanges)
        {
            var films = await FindAll(trackChanges)
                .OrderBy(film => film.Title)
                .ToListAsync();
            
            return PagedList<Film>.ToPagedList(films, filmParameters.PageNumber, filmParameters.PageSize);
        }

        public async Task<Film> GetFilmAsync(int filmId, bool trackChanges)
        {
            return await FindByCondition(film => film.Id.Equals(filmId), trackChanges)
                .SingleOrDefaultAsync();
        }

        public async Task CreateFilmAsync(Film film) => await CreateAsync(film);
        
        public void DeleteFilm(Film film) => Delete(film);
    }
}