using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<Order>> GetOrdersAsync(OrderParameters orderParameters)
        {
            var orders = FindAll()
                .AsNoTracking();

            return await PagedList<Order>.ToPagedList(
                orders.OrderBy(order => order.Id),
                orderParameters.PageNumber,
                orderParameters.PageSize
            );
        }

        public async Task<Order> GetOrderAsync(int orderId)
        {
            return await FindByCondition(order => order.Id.Equals(orderId))
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

        public async Task CreateOrderAsync(Order order) => await CreateAsync(order);
    }
}