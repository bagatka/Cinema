using System.ComponentModel.DataAnnotations;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.SeatPosition
{
    public class SeatPositionForManipulationDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Seat is required.")]
        [Range(0, int.MaxValue)]
        public int Seat { get; set; }
        [Required(ErrorMessage = "Row is required.")]
        [Range(0, int.MaxValue)]
        public int Row { get; set; }
        [Required(ErrorMessage = "SeatTypeId is required.")]
        public int SeatTypeId { get; set; }
    }
}