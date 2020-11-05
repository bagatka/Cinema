using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace iTechArt.CinemaWebApp.API.Application.Contracts
{
    public interface IRepositoryBase<TEntity>
    {
        IQueryable<TEntity> FindAll();
        IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> expression);
        Task CreateAsync(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
    }
}