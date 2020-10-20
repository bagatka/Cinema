using System.Collections;
using System.Collections.Generic;
using iTechArt.CinemaWebApp.API.Application.DTOs.HallService;
using iTechArt.CinemaWebApp.API.Application.DTOs.Seat;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Hall
{
    public class HallForCreationDto : HallForManipulationDto
    {
        public IEnumerable<SeatForCreationDto> Halls { get; set; }
        public IEnumerable<HallServiceForCreationDto> HallServices { get; set; }
    }
}