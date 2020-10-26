using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using iTechArt.CinemaWebApp.API.Application.Contracts;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {
        protected RepositoryContext RepositoryContext;

        public RepositoryBase(RepositoryContext repositoryContext)
        {
            RepositoryContext = repositoryContext;
        }

        public IQueryable<TEntity> FindAll()
        {
            return RepositoryContext.Set<TEntity>();
        }

        public IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> expression)
        {
            return RepositoryContext.Set<TEntity>()
                .Where(expression);
        }

        public async Task CreateAsync(TEntity entity) => await RepositoryContext.Set<TEntity>().AddAsync(entity);

        public void Update(TEntity entity) => RepositoryContext.Set<TEntity>().Update(entity);

        public void Delete(TEntity entity) => RepositoryContext.Set<TEntity>().Remove(entity);
    }
}