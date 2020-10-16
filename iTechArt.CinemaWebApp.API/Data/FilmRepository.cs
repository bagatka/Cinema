using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class FilmRepository : RepositoryBase<Film>, IFilmRepository
    {
        public FilmRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Film>> GetAllFilmsAsync(bool trackChanges)
        {
            return await FindAll(trackChanges)
                .OrderBy(film => film.Title)
                .ToListAsync();
        }

        public async Task<Film> GetFilmAsync(int filmId, bool trackChanges)
        {
            return await FindByCondition(film => film.Id.Equals(filmId), trackChanges)
                .SingleOrDefaultAsync();
        }
    }
}