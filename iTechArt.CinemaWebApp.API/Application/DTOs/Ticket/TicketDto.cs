using System;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Ticket
{
    public class TicketDto
    {
        public int Id { get; set; }
        public int FilmTitle { get; set; }
        public string CinemaName { get; set; }
        public string HallName { get; set; }
        public DateTime StartDateTime { get; set; }
        public int UserName { get; set; }
        public int Seat { get; set; }
        public int Row { get; set; }
        public decimal Price { get; set; }
    }
}