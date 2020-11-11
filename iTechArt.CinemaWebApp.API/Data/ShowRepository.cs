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

        public async Task<PagedList<Show>> GetShowsAsync(ShowParameters showParameters)
        {
            var shows = FindAll()
                .Include(show => show.Film)
                .Include(show => show.Hall)
                    .ThenInclude(hall => hall.Cinema)
                .AsNoTracking();

            if (showParameters.HallId != null)
            {
                shows = shows.Where(show => show.HallId.Equals(showParameters.HallId));
            }

            if (!string.IsNullOrEmpty(showParameters.Title))
            {
                shows = shows.Where(show => show.Film.Title.Equals(showParameters.Title));
            }

            if (!string.IsNullOrEmpty(showParameters.City))
            {
                shows = shows.Where(show => show.Hall.Cinema.City.Equals(showParameters.City));
            }

            if (!string.IsNullOrEmpty(showParameters.CinemaName))
            {
                shows = shows.Where(show => show.Hall.Cinema.Name.Equals(showParameters.CinemaName));
            }

            if (showParameters.Actual != null && showParameters.Actual.Value.Equals(true))
            {
                shows = shows.Where(show => show.StartDateTime.Date >= DateTime.Now.Date);
            }

            if (!string.IsNullOrEmpty(showParameters.StartDate))
            {
                if (DateTime.TryParse(showParameters.StartDate, out var startDate))
                {
                    shows = shows.Where(show => show.StartDateTime.Date >= startDate.Date);
                }
            }
            
            if (!string.IsNullOrEmpty(showParameters.EndDate))
            {
                if (DateTime.TryParse(showParameters.EndDate, out var endDate))
                {
                    shows = shows.Where(show => show.StartDateTime.Date <= endDate.Date);
                }
            }

            if (!string.IsNullOrEmpty(showParameters.Date))
            {
                if (DateTime.TryParse(showParameters.Date, out var date))
                {
                    shows = shows.Where(show => show.StartDateTime.Date.Equals(date.Date));
                }
            }

            if (showParameters.Seats != null)
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
                .Include(show => show.Film)
                .Include(show => show.Hall)
                    .ThenInclude(hall => hall.Cinema)
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }
        
        public async Task CreateShowAsync(Show show) => await CreateAsync(show);
        
        public void DeleteShow(Show show) => Delete(show);
    }
}