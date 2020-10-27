using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Show
{
    public class ShowForManipulationDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Date and time is required.")]
        public DateTime StartDateTime { get; set; }
        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than {1}.")]
        [Column(TypeName = "decimal(18,2)")]
        public double Price { get; set; }
        [Required(ErrorMessage = "Free seats is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Free seats must be greater than {1}.")]
        public int FreeSeats { get; set; }
    }
}