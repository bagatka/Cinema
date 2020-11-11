using System.Collections.Generic;

using iTechArt.CinemaWebApp.API.Application.DTOs.OrderAddon;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Order
{
    public class OrderDetails
    {
        public int ShowId { get; set; }
        public IEnumerable<int> SeatIds { get; set; }
        public decimal TotalPrice { get; set; }
        public OrderAddonDetails[] OrderAddons { get; set; }
    }
}