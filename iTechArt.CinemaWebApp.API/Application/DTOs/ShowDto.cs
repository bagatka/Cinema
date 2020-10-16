using System;
using System.ComponentModel.DataAnnotations.Schema;

using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.DTOs
{
    public class ShowDto
    {
        public int Id { get; set; }
        public DateTime StartDateTime { get; set; }
        public double Price { get; set; }
        public int FreeSeats { get; set; }
        public int FilmId { get; set; }
        public int HallId { get; set; }
        public string FilmTitle { get; set; }
        public string CinemaName { get; set; }
    }
}