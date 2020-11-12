using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Order;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Services
{
    public class OrderService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public OrderService(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<bool> OrderCheckout(OrderDetails orderDetails, int userId)
        {
            if (!await ValidateOrderDetails(orderDetails))
            {
                return false;
            }
            
            var newOrder = new Order
            {
                Total = orderDetails.TotalPrice,
                UserId = userId
            };

            var show = await _repository.Shows.GetShowAsync(orderDetails.ShowId);

            newOrder.Tickets = orderDetails.SeatIds
                .Select(seatId => 
                    new Ticket
                    {
                        ShowId = orderDetails.ShowId,
                        SeatId = seatId,
                        Price = show.Price
                    }
                )
                .ToList();

            newOrder.OrderAddons = orderDetails.OrderAddons
                .Select(orderDetail =>
                    new OrderAddon()
                    {
                        HallServiceId = orderDetail.HallServiceId,
                        Number = orderDetail.Number
                    }
                )
                .ToList();
            
            await _repository.Orders.CreateOrderAsync(newOrder);
            await _repository.SaveAsync();
            
            return true;
        }

        private async Task<bool> ValidateOrderDetails(OrderDetails details)
        {
            var show = await _repository.Shows.GetShowAsync(details.ShowId);

            if (show == null)
            {
                return false;
            }

            var seats = await _repository.SeatsSchemas.GetSeatsAsync(
                new SeatSchemaParameters
                {
                    SeatIds = details.SeatIds
                }
            );

            var seatsCount = seats.Count();

            if (seatsCount == 0)
            {
                return false;
            }

            var tickets = await _repository.Tickets.GetTicketsAsync(
                new TicketParameters
                {
                    SeatIds = details.SeatIds,
                    ShowId = show.Id
                }
            );

            if (tickets.Count > 0)
            {
                return false;
            }

            decimal hallServicesTotal = 0;

            if (details.OrderAddons.Length > 0)
            {
                var hallServices = await _repository.HallServices.GetHallServicesAsync(
                    new HallServiceParameters()
                    {
                        HallServicesIds = details.OrderAddons.Select(orderAddon => orderAddon.HallServiceId)
                    }
                );

                if (hallServices.Count == 0)
                {
                    return false;
                }

                foreach (var orderAddon in details.OrderAddons)
                {
                    var price = hallServices.FirstOrDefault(hallService =>
                        hallService.Id.Equals(orderAddon.HallServiceId))?.Price ?? 0;
                    hallServicesTotal += orderAddon.Number * price;
                }
            }

            return details.TotalPrice.Equals(show.Price * seatsCount + hallServicesTotal);
        }
    }
}