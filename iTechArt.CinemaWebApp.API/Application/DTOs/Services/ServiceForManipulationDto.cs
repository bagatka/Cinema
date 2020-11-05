using System.ComponentModel.DataAnnotations;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Services
{
    public class ServiceForManipulationDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(64, ErrorMessage = "Name length can't be more than 64.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Description is required.")]
        [StringLength(512, ErrorMessage = "Description length can't be more than 512.")]
        public string Description { get; set; }
        [StringLength(2048, ErrorMessage = "Icon URL length can't be more than 2048.")]
        public string IconUrl { get; set; }
    }
}