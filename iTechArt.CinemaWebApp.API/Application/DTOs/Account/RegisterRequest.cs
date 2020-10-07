using System.ComponentModel.DataAnnotations;

namespace iTechArt.CinemaWebApp.API.Application.DTOs.Account
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "First name is required.")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last name is required.")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Username is required.")]
        [MinLength(6, ErrorMessage = "Username length can't be less than 6 symbols.")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password length can't be less than 6 symbols.")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Confirm password is required.")]
        [Compare("Password", ErrorMessage = "Password and confirm password must match.")]
        public string ConfirmPassword { get; set; }
    }
}
