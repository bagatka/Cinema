using AutoMapper;

using iTechArt.CinemaWebApp.API.Application.DTOs.Account;
using iTechArt.CinemaWebApp.API.Application.DTOs.Cinema;
using iTechArt.CinemaWebApp.API.Application.DTOs.Film;
using iTechArt.CinemaWebApp.API.Application.DTOs.Hall;
using iTechArt.CinemaWebApp.API.Application.DTOs.HallService;
using iTechArt.CinemaWebApp.API.Application.DTOs.Order;
using iTechArt.CinemaWebApp.API.Application.DTOs.OrderAddon;
using iTechArt.CinemaWebApp.API.Application.DTOs.SeatsSchema;
using iTechArt.CinemaWebApp.API.Application.DTOs.Services;
using iTechArt.CinemaWebApp.API.Application.DTOs.Show;
using iTechArt.CinemaWebApp.API.Application.DTOs.Ticket;
using iTechArt.CinemaWebApp.API.Models;

namespace iTechArt.CinemaWebApp.API.Application.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<User, LoginResponse>();

            CreateMap<RegisterRequest, User>();

            CreateMap<Film, FilmDto>();

            CreateMap<FilmForManipulationDto, Film>();

            CreateMap<Cinema, CinemaDto>();

            CreateMap<CinemaForManipulationDto, Cinema>();

            CreateMap<Cinema, CinemaFullDto>();

            CreateMap<Show, ShowDto>()
                .ForMember(
                    showDto => showDto.FilmTitle,
                    src => src.MapFrom(show => show.Film.Title)
                )
                .ForMember(
                    showDto => showDto.CinemaName,
                    src => src.MapFrom(show => show.Hall.Cinema.Name)
                )
                .ForMember(
                    showDto => showDto.FilmPosterUrl,
                    src => src.MapFrom(show => show.Film.PosterUrl)
                )
                .ForMember(showDto => showDto.FilmDuration,
                    src => src.MapFrom(show => show.Film.Duration)
                )
                .ForMember(showDto => showDto.HallSize,
                    src => src.MapFrom(show => show.Hall.Seats)
                )
                .ForMember(showDto => showDto.CinemaImageUrl,
                    src => src.MapFrom(show => show.Hall.Cinema.ImageUrl)
                )
                .ForMember(showDto => showDto.HallId,
                    src => src.MapFrom(show => show.Hall.Id)
                );

            CreateMap<ShowForManipulationDto, Show>();

            CreateMap<Hall, HallDto>()
                .ForMember(
                    hallDto => hallDto.CinemaName,
                    src => src.MapFrom(hall => hall.Cinema.Name)
                );

            CreateMap<HallForManipulationDto, Hall>();

            CreateMap<Hall, HallFullDto>()
                .ForMember(
                    hallFullDto => hallFullDto.CinemaName,
                    src => src.MapFrom(hall => hall.Cinema.Name)
                );

            CreateMap<HallService, HallServiceDto>()
                .ForMember(
                    hallServiceDto => hallServiceDto.Name,
                    src => src.MapFrom(hallService => hallService.Service.Name)
                )
                .ForMember(hallServiceDto => hallServiceDto.Description,
                    src => src.MapFrom(serviceHall => serviceHall.Service.Description)
                )
                .ForMember(hallServiceDto => hallServiceDto.IconUrl,
                    src => src.MapFrom(serviceHall => serviceHall.Service.IconUrl)
                );

            CreateMap<HallServiceForManipulationDto, HallService>();

            CreateMap<SeatsSchema, SeatsSchemaDto>()
                .ForMember(
                    seatsSchemaDto => seatsSchemaDto.HallName,
                    src => src.MapFrom(seatsSchema => seatsSchema.Hall.Name)
                );

            CreateMap<SeatsSchemaForManipulationDto, SeatsSchema>();

            CreateMap<Service, ServiceDto>();

            CreateMap<ServiceForManipulationDto, Service>();

            CreateMap<Ticket, TicketDto>()
                .ForMember(
                    ticketDto => ticketDto.HallName,
                    src => src.MapFrom(ticket => ticket.SeatsSchema.Hall.Name)
                )
                .ForMember(
                    ticketDto => ticketDto.CinemaName,
                    src => src.MapFrom(ticket => ticket.SeatsSchema.Hall.Cinema.Name)
                )
                .ForMember(
                    ticketDto => ticketDto.FilmTitle,
                    src => src.MapFrom(ticket => ticket.Show.Film.Title)
                )
                .ForMember(
                    ticketDto => ticketDto.StartDateTime,
                    src => src.MapFrom(ticket => ticket.Show.StartDateTime)
                )
                .ForMember(
                    ticketDto => ticketDto.Seat,
                    src => src.MapFrom(ticket => ticket.SeatsSchema.Seat)
                )
                .ForMember(
                    ticketDto => ticketDto.Row,
                    src => src.MapFrom(ticket => ticket.SeatsSchema.Row)
                );

            CreateMap<TicketForManipulationDto, Ticket>();

            CreateMap<OrderAddon, OrderAddonDto>()
                .ForMember(
                    orderAddonDto => orderAddonDto.ServiceName,
                    src => src.MapFrom(orderAddon => orderAddon.HallService.Service.Name)
                );

            CreateMap<Order, OrderDto>()
                .ForMember(
                    orderDto => orderDto.UserName,
                    src => src.MapFrom(order => order.User.UserName)
                );
        }
    }
}