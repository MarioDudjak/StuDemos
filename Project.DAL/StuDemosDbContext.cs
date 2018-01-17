using Microsoft.AspNet.Identity.EntityFramework;
using Project.DAL.Entities;
using Project.DAL.Mappings;
using System.Data.Entity;

namespace Project.DAL
{
    public class StuDemosDbContext : IdentityDbContext<ApplicationUser>, IDbContext
    {
        public StuDemosDbContext() : base("name=StuDemosDbConnectionString") { }

        public static StuDemosDbContext Create()
        {
            return new StuDemosDbContext();
        }

        public DbSet<Apply> Applications { get; set; }

        public DbSet<Selection> Selections { get; set; }

        public DbSet<Course> Courses { get; set; }



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
            modelBuilder.Configurations.Add(new ApplyEntityMap());
            modelBuilder.Configurations.Add(new SelectionEntityMap());
            modelBuilder.Configurations.Add(new CourseEntityMap()); 
            base.OnModelCreating(modelBuilder);
        }
    }
}
