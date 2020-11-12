using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Show
{
    public class ShowForManipulationDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Date and time is required.")]
        public DateTime StartDateTime { get; set; }
        [Required(ErrorMessage = "FilmId is required.")]
        public int FilmId { get; set; }
        [Required(ErrorMessage = "HallId is required.")]
        public int HallId { get; set; }
        [Required(ErrorMessage = "TypePrices is required.")]
        public IEnumerable<TypePrice> TypePrices { get; set; }
    }
}