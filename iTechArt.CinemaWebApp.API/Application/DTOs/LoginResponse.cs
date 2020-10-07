namespace iTechArt.CinemaWebApp.API.Application.DTOs
{
    public class LoginResponse
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string JWToken { get; set; }
    }
}
