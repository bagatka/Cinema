﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using iTechArt.CinemaWebApp.API.Application.DTOs.Hall;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Cinema
{
    public class CinemaForManipulationDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(50, ErrorMessage = "Name length can't be more than 50.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Description is required.")]
        [StringLength(1000, ErrorMessage = "Description length can't be more than 1000.")]
        public string Description { get; set; }
        [Required(ErrorMessage = "City is required.")]
        [StringLength(50, ErrorMessage = "City length can't be more than 50.")]
        public string City { get; set; }
        [StringLength(2048, ErrorMessage = "Image URL length can't be more than 2048.")]
        public string ImageUrl { get; set; }
        
        public IEnumerable<HallForManipulationDto> Halls { get; set; }
    }
}