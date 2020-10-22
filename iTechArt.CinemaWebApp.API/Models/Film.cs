using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using iTechArt.CinemaWebApp.API.Application;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class Film
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200, ErrorMessage = "Title length can't be more than {1}.")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Description is required.")]
        [StringLength(1000, ErrorMessage = "Description length can't be more than {1}.")]
        public string Description { get; set; }
        [Range(Constants.FIRST_FILM_YEAR, int.MaxValue, ErrorMessage = "Year is required and it can't be lower than {1}.")]
        public int Year { get; set; }
        [Required(ErrorMessage = "Duration is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Year is required and it can't be lower than {1}.")]
        public int Duration { get; set; }
        [StringLength(2048, ErrorMessage = "Poster URL length can't be more than 2048.")]
        public string PosterUrl { get; set; }
        [StringLength(2048, ErrorMessage = "Banner URL length can't be more than 2048.")]
        public string BannerUrl { get; set; }
        
        public ICollection<Show> Shows { get; set; }
    }
}
