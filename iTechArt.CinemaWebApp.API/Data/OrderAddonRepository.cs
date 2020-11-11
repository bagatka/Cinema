using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class OrderAddonRepository: RepositoryBase<OrderAddon>, IOrderAddonRepository
    {
        public OrderAddonRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<OrderAddon>> GetOrderAddonsAsync(OrderAddonParameters orderAddonParameters)
        {
            var orderAddons = FindAll()
                .AsNoTracking();

            return await PagedList<OrderAddon>.ToPagedList(
                orderAddons.OrderBy(orderAddon => orderAddon.Id),
                orderAddonParameters.PageNumber,
                orderAddonParameters.PageSize
            );
        }

        public async Task<OrderAddon> GetOrderAddonAsync(int orderAddonId)
        {
            return await FindByCondition(orderAddon => orderAddon.Id.Equals(orderAddonId))
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

        public async Task CreateOrderAddonAsync(OrderAddon orderAddon) => await CreateAsync(orderAddon);
    }
}