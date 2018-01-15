namespace Project.DAL.Migrations
{
    using CsvHelper;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Project.DAL.Entities;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Text;

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
            Assembly assembly = Assembly.GetExecutingAssembly();
            string resourceName = "Project.DAL.Migrations.courses.csv";
            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            {
                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                {
                    CsvReader csvReader = new CsvReader(reader);
                    csvReader.Configuration.BadDataFound = null;
                    csvReader.Configuration.HeaderValidated = null;
                    csvReader.Configuration.MissingFieldFound = null;
                    var courses = csvReader.GetRecords<Course>().ToArray();
                    context.Courses.AddOrUpdate(c => c.CourseCode, courses);
                   
                }
            }

            resourceName = "Project.DAL.Migrations.professors.csv";

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            {
                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                {
                    CsvReader csvReader = new CsvReader(reader);
                    csvReader.Configuration.BadDataFound = null;
                    csvReader.Configuration.HeaderValidated = null;
                    csvReader.Configuration.MissingFieldFound = null;
                    while (csvReader.Read())
                    {
                        var professor = csvReader.GetRecord<ApplicationUser>();
                        var courseCode = csvReader.GetField<string>("CourseCode");
                        var professorCourses = context.Courses.Where(c => c.CourseCode == courseCode).ToList();
                        professor.Courses = professorCourses;
                        professor.JoinDate = DateTime.UtcNow;
                        professor.EmailConfirmed = true;
                        context.Users.AddOrUpdate(p => p.IdentificationNumber, professor);
                        manager.AddToRoles(professor.Id, new string[] { "Professor" });

                        foreach (var item in professorCourses)
                        {
                            Course course = context.Courses.Find(item.CourseID);
                            course.Professors.ToList().Add(professor);
                            context.Courses.AddOrUpdate(c => c.CourseCode, course);
                        }
                    }
                }
            }

        }
    }
}
