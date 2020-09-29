using AutoMapper;
using iTechArt.CinemaWebApp.API.Application.DTOs;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<User, LoginResponse>();
            CreateMap<RegisterRequest, User>();
        }  
    }
}
