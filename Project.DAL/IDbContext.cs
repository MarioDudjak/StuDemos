using Project.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL
{
    public interface IDbContext : IDisposable
    {
        DbSet<Apply> Applications { get; set; }

        DbSet<Course> Courses { get; set; }

        DbSet<Selection> Selections { get; set; }

        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;

        Task<int> SaveChangesAsync();
    }
}
