using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
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

            Console.WriteLine(showParameters.Date);
            
            if (!string.IsNullOrEmpty(showParameters.Date))
            {
                var date = DateTime.Parse(showParameters.Date);
                shows = shows.Where(show => show.StartDateTime.Date == date.Date);
                Console.WriteLine(date.Date);
            }

            return PagedList<Show>.ToPagedList(
                await shows.OrderBy(show => show.StartDateTime).ToListAsync(),
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