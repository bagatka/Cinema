﻿using iTechArt.CinemaWebApp.API.Application.DTOs.OrderAddon;
using iTechArt.CinemaWebApp.API.Application.DTOs.Ticket;
using System.Collections.Generic;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Order
{
    public class OrderDto
    {
        public string UserName { get; set; }
        public decimal Total { get; set; }

        public ICollection<TicketDto> Tickets { get; set; }
        public ICollection<OrderAddonDto> OrderAddons { get; set; }
    }
}
