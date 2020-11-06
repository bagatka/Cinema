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
                .Include(film => film.Shows)
                    .ThenInclude(show => show.Hall)
                        .ThenInclude(hall => hall.Cinema)
                .AsNoTracking()
                .Where(film => !String.IsNullOrEmpty(film.BannerUrl) == filmParameters.WithBanner || !filmParameters.WithBanner)
                .Where(film => !String.IsNullOrEmpty(film.PosterUrl) == filmParameters.WithPoster || !filmParameters.WithPoster);

            if (!string.IsNullOrEmpty(filmParameters.Title))
            {
                films = films.Where(film => film.Title.ToLower().Contains(filmParameters.Title.ToLower()));
            }

            if (!string.IsNullOrEmpty(filmParameters.CinemaName))
            {
                films = films.Where(film => film.Shows.Any(
                        show => show.Hall.Cinema.Name.Equals(filmParameters.CinemaName)
                    )
                );
            }

            if (!string.IsNullOrEmpty(filmParameters.StartDate))
            {
                var startDate = DateTime.Parse(filmParameters.StartDate);
                films = films.Where(film => film.Shows.Any(
                        show => show.StartDateTime.Date >= startDate.Date
                    )
                );
            }
            
            if (!string.IsNullOrEmpty(filmParameters.EndDate))
            {
                var endDate = DateTime.Parse(filmParameters.EndDate);
                films = films.Where(film => film.Shows.Any(
                        show => show.StartDateTime.Date <= endDate.Date
                    )
                );
            }

            if (filmParameters.Seats != null)
            {
                films = films.Where(film => film.Shows.Any(
                        show => show.FreeSeats >= filmParameters.Seats
                    )
                );
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