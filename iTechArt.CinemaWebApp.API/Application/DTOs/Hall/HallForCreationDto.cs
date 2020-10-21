using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using iTechArt.CinemaWebApp.API.Application.DTOs.HallService;
using iTechArt.CinemaWebApp.API.Application.DTOs.Seat;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Hall
{
    public class HallForCreationDto : HallForManipulationDto
    {
        [Required(ErrorMessage = "Seat schema is required.")]
        public IEnumerable<SeatForCreationDto> Seats { get; set; }
        public IEnumerable<HallServiceForCreationDto> HallServices { get; set; }
    }
}