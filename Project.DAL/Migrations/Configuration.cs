namespace Project.DAL.Migrations
{
    using CsvHelper;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Project.DAL.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
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
                   foreach (var item in courses)
                   {
                       context.Courses.AddOrUpdate(c => c.CourseCode, item);
                   }
                   context.SaveChanges();
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
                        /*
                       var createdProfessor = new ApplicationUser()
                       {
                           UserName = professor.UserName,
                           Email = professor.Email,
                           EmailConfirmed = true,
                           FirstName = professor.FirstName,
                           LastName = professor.LastName,
                           RoleName = professor.RoleName,
                           JoinDate = DateTime.UtcNow,
                           Courses=professor.Courses,
                           Password=professor.Password,
                           IdentificationNumber=professor.IdentificationNumber,

                       };*/
                       context.SaveChanges();
                        // manager.Create(createdProfessor, createdProfessor.Password);
                       manager.AddPassword(professor.Id, professor.Password);
                      // var p = manager.FindByName(createdProfessor.UserName);
                       manager.AddToRoles(professor.Id, new string[] { "Professor" });

                       foreach (var item in professorCourses)
                       {
                           Course course = context.Courses.Find(item.CourseID);
                           if (course.Professors == null)
                           {
                               course.Professors = professor.Id;
                               course.ProfessorsNames = String.Concat(professor.FirstName, " ", professor.LastName);
                           }
                           else
                           {
                               course.Professors = String.Concat(course.Professors, ",", professor.Id);
                               course.ProfessorsNames = String.Concat(course.ProfessorsNames, ',', professor.FirstName, " ", professor.LastName);
                           }

                            context.Entry(course).State = EntityState.Modified;
                       }
                       context.SaveChanges();
                   }
               }
          } 

        }
    }
}
