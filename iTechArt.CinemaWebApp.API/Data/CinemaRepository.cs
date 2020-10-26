﻿using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class CinemaRepository : RepositoryBase<Cinema>, ICinemaRepository
    {
        public CinemaRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<Cinema>> GetAllCinemasAsync(CinemaParameters cinemaParameters)
        {
            var cinemas = FindAll().AsNoTracking();
            
            if (!string.IsNullOrEmpty(cinemaParameters.Name))
            {
                cinemas = cinemas.Where(cinema => cinema.Name.ToLower().Contains(cinemaParameters.Name.ToLower()));
            }

            return PagedList<Cinema>.ToPagedList(
                await cinemas.OrderBy(cinema => cinema.Name).ToListAsync(),
                cinemaParameters.PageNumber,
                cinemaParameters.PageSize
            );
        }

        public async Task<Cinema> GetCinemaAsync(int cinemaId)
        {
            return await FindByCondition(cinema => cinema.Id.Equals(cinemaId))
                .SingleOrDefaultAsync();
        }

        public async Task CreateCinemaAsync(Cinema cinema) => await CreateAsync(cinema);

        public void DeleteCinema(Cinema cinema) => Delete(cinema);
    }
}