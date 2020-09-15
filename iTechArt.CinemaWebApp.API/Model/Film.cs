using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Model
{
    public class Film
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(200, ErrorMessage = "Title length can't be more than 200.", MinimumLength = 1)]
        public string Title { get; set; }
        [StringLength(1000, ErrorMessage = "Description length can't be more than 1000.", MinimumLength = 1)]
        public string Description { get; set; }
        [StringLength(2048, ErrorMessage = "Poster URL length can't be more than 2048.")]
        public string PosterUrl { get; set; }
        [StringLength(2048, ErrorMessage = "Banner URL length can't be more than 2048.")]
        public string BannerUrl { get; set; }
    }
}
