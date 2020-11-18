﻿using System.Collections.Generic;

using iTechArt.CinemaWebApp.API.Application.DTOs.HallService;
using iTechArt.CinemaWebApp.API.Application.DTOs.SeatPosition;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Hall
{
    public class HallFullDto : HallDto
    {
        public ICollection<SeatPositionDto> SeatPositions { get; set; }
        public ICollection<HallServiceDto> HallServices { get; set; }
    }
}