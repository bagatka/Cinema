using System.ComponentModel.DataAnnotations;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Film
{
    public class FilmDTO
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200, ErrorMessage = "Title length can't be more than 200.")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Description is required.")]
        [StringLength(1000, ErrorMessage = "Description length can't be more than 1000.")]
        public string Description { get; set; }
        [StringLength(2048, ErrorMessage = "Poster URL length can't be more than 2048.")]
        public string PosterUrl { get; set; }
        [StringLength(2048, ErrorMessage = "Banner URL length can't be more than 2048.")]
        public string BannerUrl { get; set; }
    }
}