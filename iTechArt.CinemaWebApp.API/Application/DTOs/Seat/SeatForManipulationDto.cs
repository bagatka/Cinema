using System.ComponentModel.DataAnnotations;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Seat
{
    public abstract class SeatForManipulationDto
    {
        [Required(ErrorMessage = "Seat is required.")]
        [Range(0, int.MaxValue)]
        public int SeatNumber { get; set; }
        [Required(ErrorMessage = "Row is required.")]
        [Range(0, int.MaxValue)]
        public int Row { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "Type length can't be more than 10.")]
        public string Type { get; set; }
    }
}