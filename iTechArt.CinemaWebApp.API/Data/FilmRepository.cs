using System;
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

        public async Task<PagedList<Film>> GetFilmsAsync(FilmParameters filmParameters)
        {
            var films = FindAll()
                .AsNoTracking()
                .Where(film => !String.IsNullOrEmpty(film.BannerUrl) == filmParameters.WithBanner || !filmParameters.WithBanner);

            if (!string.IsNullOrEmpty(filmParameters.Title))
            {
                films = films.Where(film => film.Title.ToLower().Contains(filmParameters.Title.ToLower()));
            }

            return await PagedList<Film>.ToPagedList(
                films.OrderBy(film => film.Title),
                filmParameters.PageNumber,
                filmParameters.PageSize
            );
        }

        public async Task<Film> GetFilmAsync(int filmId)
        {
            return await FindByCondition(film => film.Id.Equals(filmId))
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

        public async Task CreateFilmAsync(Film film) => await CreateAsync(film);
        
        public void DeleteFilm(Film film) => Delete(film);
    }
}