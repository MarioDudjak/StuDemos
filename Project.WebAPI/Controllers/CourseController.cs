using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Project.DAL;
using Project.DAL.Entities;
using AutoMapper;
using System.Data.Entity.Validation;
using System.Data.Entity.Migrations;

namespace Project.WebAPI.Controllers
{
    [RoutePrefix("api/course")]
    public class CourseController : ApiController
    {

        #region Constructors

        public CourseController(IMapper mapper)
        {
            Mapper = mapper;
        }
        #endregion Constructors

        private readonly IMapper Mapper;

        private StuDemosDbContext db = new StuDemosDbContext();

       
      
        [HttpGet]
        [Route("get")]
        [Authorize]
        // GET: api/Course
        public IQueryable<Course> GetCourses()
        {
            return db.Courses; 
        }

        // GET: api/Course/5
        [ResponseType(typeof(Course))]
        [HttpGet]
        [Route("getbyid/{id:guid}")]
        public async Task<IHttpActionResult> GetCourse(Guid id)
        {
            Course course = await db.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        // PUT: api/Course/5
        [ResponseType(typeof(void))]
        [HttpPut]
        [Authorize(Roles = "Student,Professor,Admin")]
        [Route("update/{id:guid}")]
        public async Task<IHttpActionResult> PutCourse(Guid id, Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != course.CourseID)
            {
                return BadRequest();
            }
            course.Professors = null;
            course.ProfessorsNames = null;
            var professorsCodes = course.ProfessorsCodes;
            string[] courseProfessors = professorsCodes.Split(',');
            foreach (var item in courseProfessors)
            {
                var users = db.Users.Where(c => c.IdentificationNumber == item);
                ApplicationUser professor = null;
                if (users.Count() != 0)
                {
                    professor = db.Users.Where(c => c.IdentificationNumber == item).First();
                }

                if (professor != null)
                {
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

                    if (professor.Courses == null)
                    {
                        professor.Courses = new Course[] { course };
                    }
                    else 
                    {
                        var i = -1;
                        try
                        {
                            i = professor.Courses.ToList().FindIndex(c => c.CourseID == course.CourseID);
                        }
                        catch(Exception e)
                        {
                            i = -1;
                        }
                        if (i!=-1)
                        {
                            professor.Courses.ToList()[i] = course;
                        }
                        else
                        {
                            professor.Courses = new Course[] { course };
                        }
                    }

                    db.Users.AddOrUpdate(user => user.UserName, professor);
                }

            }
           
            

            db.Entry(course).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Course
        [ResponseType(typeof(Course))]
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("create", Name = "CreateCourse")]
        public async Task<IHttpActionResult> PostCourse(Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var professorsCodes = course.ProfessorsCodes;
            string[] courseProfessors = professorsCodes.Split(',');
            foreach (var item in courseProfessors)
            {
                var users = db.Users.Where(c => c.IdentificationNumber == item);
                ApplicationUser professor = null;
                if (users.Count() != 0) {
                    professor = db.Users.Where(c => c.IdentificationNumber == item).First();
                }

                if (professor != null)
                {
                    if (course.Professors == null)
                    {
                        course.Professors = professor.Id;
                        course.ProfessorsNames = String.Concat(professor.FirstName, " ", professor.LastName);
                    }
                    else
                    {
                        course.Professors = String.Concat(course.Professors, ",", professor.Id);
                        course.ProfessorsNames =String.Concat(course.ProfessorsNames,',',professor.FirstName, " ", professor.LastName);
                    }

                    professor.Courses.Add(course);
                    db.Users.AddOrUpdate(user => user.UserName, professor);
                }
                
            }
            db.Courses.Add(course);
            await db.SaveChangesAsync();
            return CreatedAtRoute("CreateCourse", new { id = course.CourseID }, course);
        }

        // DELETE: api/Course/5
        [ResponseType(typeof(Course))]
        [HttpDelete]
        [Route("delete/{id:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> DeleteCourse(Guid id)
        {
            Course course = await db.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            db.Courses.Remove(course);
            await db.SaveChangesAsync();

            return Ok(course);
        }

        

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CourseExists(Guid id)
        {
            return db.Courses.Count(e => e.CourseID == id) > 0;
        }
    }
}