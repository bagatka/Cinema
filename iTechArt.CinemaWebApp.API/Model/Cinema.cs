using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Model
{
    public class Cinema
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(50, ErrorMessage = "Name length can't be more than 50.", MinimumLength = 1)]
        public string Name { get; set; }
        [StringLength(1000, ErrorMessage = "Description length can't be more than 1000.", MinimumLength = 1)]
        public string Description { get; set; }
        [StringLength(50, ErrorMessage = "City length can't be more than 50.", MinimumLength = 1)]
        public string City { get; set; }
        [StringLength(2048, ErrorMessage = "Image URL length can't be more than 2048.")]
        public string ImageUrl { get; set; }
    }
}
