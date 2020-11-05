using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.ActionFilters
{
    public class ValidateFilmExistsAttribute : ValidateEntityExistsAttribute<Film>
    {
        public ValidateFilmExistsAttribute(IRepositoryManager repository) : base(repository)
        {
        }
        
        protected override async Task<Film> GetEntityById(int id)
        {
            return await Repository.Films.GetFilmAsync(id);
        }
    }
}