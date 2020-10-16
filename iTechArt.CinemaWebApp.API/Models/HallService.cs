using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class HallService
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "ServiceId is required.")]
        public int ServiceId { get; set; }
        [Required(ErrorMessage = "HallId is required.")]
        public int HallId { get; set; }
        [Required(ErrorMessage = "Price is required.")]
        [Range(0.0, Double.MaxValue, ErrorMessage = "Price must be greater than {1}.")]
        public decimal Price { get; set; }
        [Required(ErrorMessage = "Available is required.")]
        public bool Available { get; set; }

        [ForeignKey(nameof(ServiceId))]
        public Service Service { get; set; }
        [ForeignKey(nameof(HallId))]
        public Hall Hall { get; set; }
    }
}
