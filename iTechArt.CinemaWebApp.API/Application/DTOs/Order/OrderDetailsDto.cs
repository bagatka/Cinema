using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using iTechArt.CinemaWebApp.API.Application.DTOs.OrderAddon;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Order
{
    public class OrderDetailsDto
    {
        [Required]
        public int ShowId { get; set; }
        [Required]
        public IEnumerable<int> SeatIds { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        public OrderAddonDetails[] OrderAddons { get; set; }
    }
}