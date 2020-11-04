using System;
using System.ComponentModel.DataAnnotations;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.HallService
{
    public class HallServiceForManipulationDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Price is required.")]
        [Range(0.0, Double.MaxValue, ErrorMessage = "Price must be greater than {1}.")]
        public decimal Price { get; set; }
        [Required(ErrorMessage = "ServiceId is required.")]
        public int ServiceId { get; set; }
        [Required(ErrorMessage = "Available is required.")]
        public bool Available { get; set; }
    }
}