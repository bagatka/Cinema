namespace iTechArt.CinemaWebApp.API.Application.RequestFeatures
{
    public class OrderParameters : RequestParameters
    {
        public bool? Active { get; set; }
        public int? UserId { get; set; }
    }
}