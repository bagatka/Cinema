using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IOrderRepository
    {
        Task<PagedList<Order>> GetOrdersAsync(OrderParameters orderParameters);
        Task<Order> GetOrderAsync(int orderId);
        Task CreateOrderAsync(Order order);
    }
}