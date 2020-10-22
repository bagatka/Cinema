using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class ServiceRepository : RepositoryBase<Service>, IServiceRepository
    {
        public ServiceRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<Service>> GetAllServicesAsync(ServiceParameters serviceParameters, bool trackChanges)
        {
            var services = await FindAll(trackChanges)
                .OrderBy(service => service.Name)
                .ToListAsync();
            
            return PagedList<Service>.ToPagedList(services, serviceParameters.PageNumber, serviceParameters.PageSize);
        }

        public async Task<Service> GetServiceAsync(int serviceId, bool trackChanges)
        {
            return await FindByCondition(service => service.Id.Equals(serviceId), trackChanges)
                .SingleOrDefaultAsync();
        }

        public async Task CreateServiceAsync(Service service) => await CreateAsync(service);
        
        public void DeleteService(Service service) => Delete(service);
    }
}