using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IHallServiceRepository
    {
        Task<PagedList<HallService>> GetHallServicesAsync(HallServiceParameters hallServiceParameters);
        Task<HallService> GetHallServiceAsync(int hallServiceId);
        Task CreateHallServiceAsync(HallService hallService);
        void DeleteHallService(HallService hallService);
    }
}