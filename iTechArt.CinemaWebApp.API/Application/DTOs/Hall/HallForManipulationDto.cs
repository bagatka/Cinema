using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using iTechArt.CinemaWebApp.API.Application.DTOs.HallService;
using iTechArt.CinemaWebApp.API.Application.DTOs.Seat;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Hall
{
    public class HallForManipulationDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(200, ErrorMessage = "Name length can't be more than 200.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Size is required.")]
        [Range(1, int.MaxValue)]
        public int SeatsNumber { get; set; }
        
        [Required(ErrorMessage = "Seat schema is required.")]
        public IEnumerable<SeatForManipulationDto> Seats { get; set; }
        public IEnumerable<HallServiceForManipulationDto> HallServices { get; set; }
    }
}