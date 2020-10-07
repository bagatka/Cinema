using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class Ticket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "ShowId is required.")]
        public int ShowId { get; set; }
        [Required(ErrorMessage = "UserId is required.")]
        public int UserId { get; set; }
        [Required(ErrorMessage = "Price is required.")]
        public decimal Price { get; set; }

        [ForeignKey("ShowId")]
        public Show Show { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
