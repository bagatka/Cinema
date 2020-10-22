using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.Contracts;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;
        private IFilmRepository _filmRepository;
        private ICinemaRepository _cinemaRepository;
        private IHallRepository _hallRepository;
        private ISeatRepository _seatRepository;
        private IServiceRepository _serviceRepository;
        private IHallServiceRepository _hallServiceRepository;
        private IShowRepository _showRepository;
        private IUserRepository _userRepository;
        private ITicketRepository _ticketRepository;

        public IFilmRepository Films => _filmRepository ??= new FilmRepository(_repositoryContext);
        public ICinemaRepository Cinemas => _cinemaRepository ??= new CinemaRepository(_repositoryContext);
        public IHallRepository Halls => _hallRepository ??= new HallRepository(_repositoryContext);
        public ISeatRepository Seats => _seatRepository ??= new SeatRepository(_repositoryContext);
        public IServiceRepository Services => _serviceRepository ??= new ServiceRepository(_repositoryContext);
        public IHallServiceRepository HallServices => _hallServiceRepository ??= new HallServiceRepository(_repositoryContext);
        public IShowRepository Shows => _showRepository ??= new ShowRepository(_repositoryContext);
        public IUserRepository Users => _userRepository ??= new UserRepository(_repositoryContext);
        public ITicketRepository Tickets => _ticketRepository ??= new TicketRepository(_repositoryContext);

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public Task SaveAsync() => _repositoryContext.SaveChangesAsync();
    }
}