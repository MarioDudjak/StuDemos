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

namespace Project.WebAPI.Controllers
{
    [RoutePrefix("api/courseTerm")]

    public class CourseTermController : ApiController
    {
        private StuDemosDbContext db = new StuDemosDbContext();

        // GET: api/CourseTerm
        [HttpGet]
        [Route("get")]
        [Authorize]
        public IQueryable<CourseTerm> GetCourseTerms()
        {
            return db.CourseTerms;
        }

        // GET: api/CourseTerm/5
        [ResponseType(typeof(CourseTerm))]
        [HttpGet]
        [Route("getbyid/{id:guid}")]
        public async Task<IHttpActionResult> GetCourseTerm(Guid id)
        {
            CourseTerm courseTerm = await db.CourseTerms.FindAsync(id);
            if (courseTerm == null)
            {
                return NotFound();
            }

            return Ok(courseTerm);
        }

        [ResponseType(typeof(CourseTerm))]
        [HttpGet]
        [Route("getbystudentid/{id}")]
        public async Task<IHttpActionResult> GetStudentCourseTerm(string id)
        {
            var courseTerms = db.CourseTerms.Where(a => a.StudentID == id);
            CourseTerm courseTerm = null;
            if (courseTerms.Count() != 0)
            {
                courseTerm = await courseTerms.FirstAsync();
            }
            if (courseTerm == null)
            {
                return NotFound();
            }

            return Ok(courseTerm);
        }

        // PUT: api/CourseTerm/5
        [ResponseType(typeof(void))]
        [HttpPut]
        [Authorize(Roles = "Student,Professor,Admin")]
        [Route("update/{id:guid}")]
        public async Task<IHttpActionResult> PutCourseTerm(Guid id, CourseTerm courseTerm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != courseTerm.CourseTermID)
            {
                return BadRequest();
            }

            db.Entry(courseTerm).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseTermExists(id))
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

        // POST: api/CourseTerm
        [ResponseType(typeof(CourseTerm))]
        [HttpPost]
        [Authorize]
        [Route("create", Name = "CreateCourseTerm")]
        public async Task<IHttpActionResult> PostCourseTerm(CourseTerm courseTerm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CourseTerms.Add(courseTerm);
            await db.SaveChangesAsync();

            return CreatedAtRoute("CreateCourseTerm", new { id = courseTerm.CourseTermID }, courseTerm);
        }

        // DELETE: api/CourseTerm/5
        [ResponseType(typeof(CourseTerm))]
        [HttpDelete]
        [Route("delete/{id:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> DeleteCourseTerm(Guid id)
        {
            CourseTerm courseTerm = await db.CourseTerms.FindAsync(id);
            if (courseTerm == null)
            {
                return NotFound();
            }

            db.CourseTerms.Remove(courseTerm);
            await db.SaveChangesAsync();

            return Ok(courseTerm);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CourseTermExists(Guid id)
        {
            return db.CourseTerms.Count(e => e.CourseTermID == id) > 0;
        }
    }
}