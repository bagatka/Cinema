using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.ActionFilters
{
    public class ValidateCinemaExistsAttribute : ValidateEntityExistsAttribute<Cinema>
    {
        public ValidateCinemaExistsAttribute(IRepositoryManager repository) : base(repository)
        {
        }
        
        protected override async Task<Cinema> GetEntityById(int id)
        {
            return await Repository.Cinemas.GetCinemaAsync(id);
        }
    }
}