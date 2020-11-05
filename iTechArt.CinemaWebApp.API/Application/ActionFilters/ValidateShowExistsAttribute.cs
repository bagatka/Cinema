using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.ActionFilters
{
    public class ValidateShowExistsAttribute : ValidateEntityExistsAttribute<Show>
    {
        public ValidateShowExistsAttribute(IRepositoryManager repository) : base(repository)
        {
        }
        
        protected override async Task<Show> GetEntityById(int id)
        {
            return await Repository.Shows.GetShowAsync(id);
        }
    }
}