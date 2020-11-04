using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class HallServiceRepository : RepositoryBase<HallService>, IHallServiceRepository
    {
        public HallServiceRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
        
        public async Task<PagedList<HallService>> GetHallServicesAsync(HallServiceParameters hallServiceParameters)
        {
            var hallServices = FindAll()
                .AsNoTracking()
                .OrderBy(hallService => hallService.Id);

            return await PagedList<HallService>.ToPagedList(
                hallServices,
                hallServiceParameters.PageNumber,
                hallServiceParameters.PageSize
            );
        }

        public async Task<HallService> GetHallServiceAsync(int hallServiceId)
        {
            return await FindByCondition(service => service.Id.Equals(hallServiceId))
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

        public async Task CreateHallServiceAsync(HallService hallService) => await CreateAsync(hallService);
        
        public void DeleteHallService(HallService hallService) => Delete(hallService);
    }
}