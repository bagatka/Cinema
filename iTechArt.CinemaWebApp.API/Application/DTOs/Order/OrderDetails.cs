using System.Collections.Generic;

using iTechArt.CinemaWebApp.API.Application.DTOs.OrderAddon;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Order
{
    public class OrderDetails
    {
        public int ShowId { get; set; }
        public IReadOnlyCollection<int> SeatIds { get; set; }
        public decimal TotalPrice { get; set; }
        public IReadOnlyCollection<OrderAddonDetails> OrderAddons { get; set; }
    }
}