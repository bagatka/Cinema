using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Newtonsoft.Json;

namespace iTechArt.CinemaWebApp.API.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        [StringLength(320, ErrorMessage = "Email length can't be more than 320.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [JsonIgnore]
        public string PasswordHash { get; set; }
        [Required(ErrorMessage = "FirstName is required.")]
        [StringLength(256, ErrorMessage = "FirstName length can't be more than 256.")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "LastName is required.")]
        [StringLength(256, ErrorMessage = "LastName length can't be more than 256.")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "UserName is required.")]
        [StringLength(256, ErrorMessage = "LastName length can't be more than 256.")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Role is required.")]
        [StringLength(10, ErrorMessage = "Role length can't be more than 10.")]
        public string Role { get; set; }
    }
}
