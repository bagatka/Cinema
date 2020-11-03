using System.Threading.Tasks;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.ActionFilters
{
    public class ValidateHallServiceExistsAttribute : ValidateEntityExistsAttribute<HallService>
    {
        public ValidateHallServiceExistsAttribute(IRepositoryManager repository) : base(repository)
        {
        }
        
        protected override async Task<HallService> GetEntityById(int id)
        {
            return await Repository.HallServices.GetServiceAsync(id);
        }
    }
}