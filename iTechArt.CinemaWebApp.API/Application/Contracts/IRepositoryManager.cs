using System.Threading.Tasks;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IRepositoryManager
    {
        IFilmRepository Films { get; }
        ICinemaRepository Cinemas { get; }
        IHallRepository Halls { get; }
        IServiceRepository Services { get; }
        IShowRepository Shows { get; }
        IUserRepository Users { get; }
        Task SaveAsync();
    }
}