using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class Hall
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(200, ErrorMessage = "Name length can't be more than 200.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Seats is required.")]
        [Range(1, int.MaxValue)]
        public int Seats { get; set; }
        [Required(ErrorMessage = "CinemaId is required.")]
        public int CinemaId { get; set; }

        [ForeignKey(nameof(CinemaId))]
        public Cinema Cinema { get; set; }
        
        public ICollection<Show> Shows { get; set; }
        public ICollection<SeatsSchema> SeatsSchemas { get; set; }
        public ICollection<HallService> HallServices { get; set; }
    }
}
