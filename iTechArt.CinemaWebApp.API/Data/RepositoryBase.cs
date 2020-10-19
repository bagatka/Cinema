using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using iTechArt.CinemaWebApp.API.Application.Contracts;

namespace iTechArt.CinemaWebApp.API.Data
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected RepositoryContext RepositoryContext;

        public RepositoryBase(RepositoryContext repositoryContext)
        {
            RepositoryContext = repositoryContext;
        }

        public IQueryable<T> FindAll(bool trackChanges)
        {
            return !trackChanges
                ? RepositoryContext.Set<T>()
                    .AsNoTracking()
                : RepositoryContext.Set<T>();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges)
        {
            return !trackChanges
                ? RepositoryContext.Set<T>()
                    .Where(expression)
                    .AsNoTracking()
                : RepositoryContext.Set<T>()
                    .Where(expression);
        }

        public async Task CreateAsync(T entity) => await RepositoryContext.Set<T>().AddAsync(entity);

        public void Update(T entity) => RepositoryContext.Set<T>().Update(entity);

        public void Delete(T entity) => RepositoryContext.Set<T>().Remove(entity);
    }
}