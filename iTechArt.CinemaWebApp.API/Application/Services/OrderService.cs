using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.Contracts;
using iTechArt.CinemaWebApp.API.Application.DTOs.Order;
using iTechArt.CinemaWebApp.API.Application.RequestFeatures;
using iTechArt.CinemaWebApp.API.Application.Wrappers;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Services
{
    public class OrderService
    {
        private readonly IRepositoryManager _repository;

        public OrderService(IRepositoryManager repository)
        {
            _repository = repository;
        }

        public async Task<Response<int>> OrderCheckout(OrderDetails orderDetails, int userId)
        {
            var validateOrderResponse = await ValidateOrderDetails(orderDetails);
            if (!validateOrderResponse.Succeeded)
            {
                return new Response<int>(validateOrderResponse.Message);
            }

            if (!validateOrderResponse.Data.Equals(orderDetails.TotalPrice))
            {
                return new Response<int>("Incorrect total price.");
            }

            var newOrder = new Order
            {
                Total = orderDetails.TotalPrice,
                UserId = userId,
                
                Tickets = orderDetails.SeatIds
                    .Select(seatId =>
                        new Ticket
                        {
                            ShowId = orderDetails.ShowId,
                            TicketSeat = new TicketSeat {SeatPositionId = seatId, Status = "sold"}
                        }
                    )
                    .ToList(),
                
                OrderAddons = orderDetails.OrderAddons
                    .Select(orderDetail =>
                        new OrderAddon {HallServiceId = orderDetail.HallServiceId, Number = orderDetail.Number}
                    )
                    .ToList()
            };

            await _repository.Orders.CreateOrderAsync(newOrder);
            await _repository.SaveAsync();

            return new Response<int>(newOrder.Id);
        }

        private async Task<Response<decimal>> ValidateOrderDetails(OrderDetails details)
        {
            var show = await _repository.Shows.GetShowAsync(details.ShowId);

            if (show == null)
            {
                return new Response<decimal>($"No shows found with id: {details.ShowId}.");
            }

            var seats = await _repository.SeatPositions.GetSeatsAsync(
                new SeatPositionParameters
                {
                    SeatIds = details.SeatIds
                }
            );

            var seatPositions = seats as SeatPosition[] ?? seats.ToArray();
            var seatsCount = seatPositions.Length;

            if (seatsCount == 0)
            {
                return new Response<decimal>($"Incorrect seat ids.");
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
                return new Response<decimal>($"Incorrect seats. Booked seats can't be booked again.");
            }

            decimal hallServicesTotal = 0;

            if (details.OrderAddons.Count > 0)
            {
                var hallServices = await _repository.HallServices.GetHallServicesAsync(
                    new HallServiceParameters
                    {
                        HallServicesIds = details.OrderAddons.Select(orderAddon => orderAddon.HallServiceId)
                    }
                );

                if (hallServices.Count == 0)
                {
                    return new Response<decimal>($"Incorrect service ids.");
                }

                foreach (var orderAddon in details.OrderAddons)
                {
                    var price = hallServices.FirstOrDefault(hallService =>
                        hallService.Id.Equals(orderAddon.HallServiceId))?.Price ?? 0;
                    hallServicesTotal += orderAddon.Number * price;
                }
            }

            decimal seatsTotal = 0;
            
            foreach (var seatPosition in seatPositions)
            {
                seatsTotal += show.TypePrices
                    .FirstOrDefault(typePrice => typePrice.SeatTypeId.Equals(seatPosition.SeatTypeId))?.Price ?? 0;
            }

            return new Response<decimal>(seatsTotal + hallServicesTotal);
        }
    }
}