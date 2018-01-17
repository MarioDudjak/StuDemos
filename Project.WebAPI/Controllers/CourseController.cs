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
            return db.Courses; //Ovo kasnije smisliti na koji način sve dohvatiti
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
        [Route("create")]
        public async Task<IHttpActionResult> PostCourse(Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Courses.Add(course);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = course.CourseID }, course);
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