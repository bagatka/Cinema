using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.ActionFilters
{
    public class ValidateServiceExistsAttribute : ValidateEntityExistsAttribute<Service>
    {
        public ValidateServiceExistsAttribute(IRepositoryManager repository) : base(repository)
        {
        }
        
        protected override async Task<Service> GetEntityById(int id)
        {
            return await Repository.Services.GetServiceAsync(id);
        }
    }
}