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
        private IServiceRepository _serviceRepository;
        private IShowRepository _showRepository;
        private IUserRepository _userRepository;

        public IFilmRepository Films => _filmRepository ??= new FilmRepository(_repositoryContext);
        public ICinemaRepository Cinemas => _cinemaRepository ??= new CinemaRepository(_repositoryContext);
        public IHallRepository Halls => _hallRepository ??= new HallRepository(_repositoryContext);
        public IServiceRepository Services => _serviceRepository ??= new ServiceRepository(_repositoryContext);
        public IShowRepository Shows => _showRepository ??= new ShowRepository(_repositoryContext);
        public IUserRepository Users => _userRepository ??= new UserRepository(_repositoryContext);
        
        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public Task SaveAsync() => _repositoryContext.SaveChangesAsync();
    }
}