using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class ShowRepository : RepositoryBase<Show>, IShowRepository
    {
        public ShowRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Show>> GetShowsAsync(ShowParameters showParameters)
        {
            var shows = FindAll()
                .Include(show => show.Film)
                .Include(show => show.Hall)
                    .ThenInclude(hall => hall.Cinema)
                .AsNoTracking();

            if (showParameters.HallId != -1)
            {
                shows = shows.Where(show => show.HallId == showParameters.HallId);
            }

            if (!string.IsNullOrEmpty(showParameters.FilmTitle))
            {
                shows = shows.Where(show => show.Film.Title.Equals(showParameters.FilmTitle));
            }

            if (!string.IsNullOrEmpty(showParameters.City))
            {
                shows = shows.Where(show => show.Hall.Cinema.City.Equals(showParameters.City));
            }

            if (!string.IsNullOrEmpty(showParameters.CinemaName))
            {
                shows = shows.Where(show => show.Hall.Cinema.Name.Equals(showParameters.CinemaName));
            }

            if (!string.IsNullOrEmpty(showParameters.StartDate))
            {
                var startDate = DateTime.Parse(showParameters.StartDate);
                shows = shows.Where(show => show.StartDateTime.Date >= startDate.Date);
            }
            
            if (!string.IsNullOrEmpty(showParameters.EndDate))
            {
                var endDate = DateTime.Parse(showParameters.EndDate);
                shows = shows.Where(show => show.StartDateTime.Date <= endDate.Date);
            }

            if (!string.IsNullOrEmpty(showParameters.Date))
            {
                var date = DateTime.Parse(showParameters.Date);
                shows = shows.Where(show => show.StartDateTime.Date == date.Date);
            }

            if (showParameters.Seats != -1)
            {
                shows = shows.Where(show => show.FreeSeats > showParameters.Seats);
            }

            return await PagedList<Show>.ToPagedList(
                shows.OrderBy(show => show.StartDateTime),
                showParameters.PageNumber,
                showParameters.PageSize
            );
        }

        public async Task<Show> GetShowAsync(int showId)
        {
            return await FindByCondition(show => show.Id.Equals(showId))
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }
        
        public async Task CreateShowAsync(Show show) => await CreateAsync(show);
        
        public void DeleteShow(Show show) => Delete(show);
    }
}