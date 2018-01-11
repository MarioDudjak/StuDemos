namespace Project.DAL.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Project.DAL.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Project.DAL.StuDemosDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Project.DAL.StuDemosDbContext context)
        {
            //  This method will be called after migrating to the latest version.
           

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new StuDemosDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new StuDemosDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "SuperAdmin",
                Email = "dudjakmario2014@gmail.com",
                EmailConfirmed = true,
                FirstName = "Admin",
                LastName = "Admin",
                RoleName = "Admin",
                JoinDate = DateTime.Now.AddYears(-3)
            };

            manager.Create(user, "admin.123");

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "Professor" });
                roleManager.Create(new IdentityRole { Name = "Student" });
            }

            var adminUser = manager.FindByName("SuperAdmin");

            manager.AddToRoles(adminUser.Id, new string[] { "Admin" });
        }
    }
}
