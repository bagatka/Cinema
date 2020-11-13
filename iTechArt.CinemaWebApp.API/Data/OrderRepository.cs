using System;
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
                .Include(order => order.Tickets)
                    .ThenInclude(ticket => ticket.TicketSeat)
                        .ThenInclude(ticketSeat => ticketSeat.SeatPosition)
                            .ThenInclude(seatPosition => seatPosition.SeatType)
                .Include(order => order.Tickets)
                    .ThenInclude(ticket => ticket.Show)
                        .ThenInclude(show => show.Film)
                .Include(order => order.Tickets)
                    .ThenInclude(ticket => ticket.Show)
                        .ThenInclude(show => show.Hall)
                            .ThenInclude(hall => hall.Cinema)
                .Include(order => order.OrderAddons)
                    .ThenInclude(orderAddon => orderAddon.HallService)
                        .ThenInclude(hallService => hallService.Service)
                .AsNoTracking();

            if (orderParameters.UserId != null)
            {
                orders = orders.Where(order => order.UserId.Equals(orderParameters.UserId));
            }

            if (orderParameters.Active != null)
            {
                orders = orders.Where(
                        order => order.Tickets.All(ticket =>
                            orderParameters.Active.Value ? ticket.Show.StartDateTime > DateTime.Now : ticket.Show.StartDateTime <= DateTime.Now));
            }

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