using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IOrderAddonRepository
    {
        Task<PagedList<OrderAddon>> GetOrderAddonsAsync(OrderAddonParameters orderAddonParameters);
        Task<OrderAddon> GetOrderAddonAsync(int orderAddonId);
        Task CreateOrderAddonAsync(OrderAddon orderAddon);
    }
}