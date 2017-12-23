using Project.DAL;
using Project.Repository.Common;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Project.Repository
{
    public class GenericRepository : IGenericRepository
    {
        protected IDbContext DbContext { get; private set; }
        protected IUnitOfWorkFactory UnitOfWorkFactory { get; private set; }

        public GenericRepository(IDbContext dbContext, IUnitOfWorkFactory unitOfWorkFactory)
        {
            DbContext = dbContext;
            UnitOfWorkFactory = unitOfWorkFactory;
        }

        public IUnitOfWork CreateUnitOfWork()
        {
            return UnitOfWorkFactory.CreateUnitOfWork();
        }

        public virtual async Task<T> AddAsync<T>(T entity) where T : class
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
            }
            else
            {
                DbContext.Set<T>().Add(entity);
            }
            try
            {
                await DbContext.SaveChangesAsync();
                return entity;
            }
            
            
            catch (Exception ex)
            {
                Trace.WriteLine(ex.Message);
                throw;
            }
            
        }

        public virtual async Task<int> DeleteAsync<T>(T entity) where T : class
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Deleted)
            {
                dbEntityEntry.State = EntityState.Deleted;
            }
            else
            {
                DbContext.Set<T>().Attach(entity);
                DbContext.Set<T>().Remove(entity);
            }
            return await DbContext.SaveChangesAsync();
        }

        public virtual async Task<int> DeleteAsync<T>(Guid id) where T : class
        {
            var entity = await GetByIDAsync<T>(id);
            if (entity == null)
            {
                throw new KeyNotFoundException("Entity with specified id not found.");
            }
            return await DeleteAsync<T>(entity);
        }

        public virtual Task<List<T>> GetAsync<T>() where T : class
        {
            return DbContext.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetByIDAsync<T>(Guid id) where T : class
        {
            return await DbContext.Set<T>().FindAsync(id);
        }

        public virtual IQueryable<T> GetWhere<T>() where T : class
        {
            return DbContext.Set<T>();
        }

        public async Task<T> UpdateAsync<T>(T entity) where T : class
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);

            if (dbEntityEntry.State == EntityState.Detached)
            {
                DbContext.Set<T>().Attach(entity);
            }

            dbEntityEntry.State = EntityState.Modified;
            try
            {
                 await DbContext.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
    
