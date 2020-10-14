using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.DTOs;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Mapping
{
    public class CinemaMapping : Profile
    {
        public CinemaMapping()
        {
            CreateMap<CinemaDTO, Cinema>();
            CreateMap<Cinema, CinemaDTO>();
        }
    }
}