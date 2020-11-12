using System;
using System.Collections.Generic;
using iTechArt.CinemaWebApp.API.Application.DTOs.Ticket;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Show
{
    public class ShowDto
    {
        public int Id { get; set; }
        public DateTime StartDateTime { get; set; }
        public int FilmDuration { get; set; }
        public decimal Price { get; set; }
        public int FreeSeats { get; set; }
        public int HallId { get; set; }
        public int HallSize { get; set; }
        public string FilmTitle { get; set; }
        public string FilmPosterUrl { get; set; }
        public string CinemaName { get; set; }
        public string CinemaImageUrl { get; set; }
    }
}