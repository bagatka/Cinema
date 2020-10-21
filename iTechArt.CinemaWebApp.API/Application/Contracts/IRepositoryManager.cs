using System.Threading.Tasks;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IRepositoryManager
    {
        IFilmRepository Films { get; }
        ICinemaRepository Cinemas { get; }
        IHallRepository Halls { get; }
        ISeatRepository Seats { get; }
        IServiceRepository Services { get; }
        IHallServiceRepository HallServices { get; }
        IShowRepository Shows { get; }
        IUserRepository Users { get; }
        ITicketRepository Tickets { get; }
        
        Task SaveAsync();
    }
}