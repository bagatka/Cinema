using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IServiceRepository
    {
        Task<PagedList<Service>> GetAllServicesAsync(ServiceParameters serviceParameters, bool trackChanges);
        Task<Service> GetServiceAsync(int serviceId, bool trackChanges);
        Task CreateServiceAsync(Service service);
        void DeleteService(Service service);
    }
}