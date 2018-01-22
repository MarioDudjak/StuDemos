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
using System.Data.Entity.Migrations;
using System.Data.Entity.Validation;

namespace Project.WebAPI.Controllers
{
    [RoutePrefix("api/apply")]

    public class ApplicationController : ApiController
    {
        #region Constructors

        public ApplicationController(IMapper mapper)
        {
            Mapper = mapper;
        }
        #endregion Constructors

        private readonly IMapper Mapper;
        private StuDemosDbContext db = new StuDemosDbContext();

        // GET: api/Application
        [HttpGet]
        [Route("get")]
        [Authorize(Roles="Admin")]
        public IQueryable<Apply> GetApplications()
        {
            return db.Applications;
        }

        // GET: api/Application/5
        [ResponseType(typeof(Apply))]
        [HttpGet]
        [Route("getbyid/{id:guid}")]
        public async Task<IHttpActionResult> GetApply(Guid id)
        {
            Apply apply = await db.Applications.FindAsync(id);
            if (apply == null)
            {
                return NotFound();
            }

            return Ok(apply);
        }

        [ResponseType(typeof(Apply))]
        [HttpGet]
        [Route("getbystudentid/{id}")]
        public async Task<IHttpActionResult> GetStudentApply(string id)
        {
            Apply apply = await db.Applications.Where(a => a.StudentID == id).FirstAsync();
            if (apply == null)
            {
                return NotFound();
            }

            return Ok(apply);
        }

        // PUT: api/Application/5
        [ResponseType(typeof(void))]
        [HttpPut]
        [Authorize(Roles = "Student,Admin")]
        [Route("update/{id:guid}")]
        public async Task<IHttpActionResult> PutApply(Guid id, Apply apply)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != apply.ApplyID)
            {
                return BadRequest();
            }


            if (apply.ApplyStatus == 1)
            {
                Selection[] selections = new Selection[] { apply.Selections.ElementAt(0) };
                apply.Selections = selections;

                Guid courseID = apply.Selections.ElementAt(0).CourseID;
                Course selectedCourse = db.Courses.Where(c => c.CourseID == courseID).First();

                if (selectedCourse.Students == null)
                {
                    selectedCourse.Students = apply.StudentID;
                    var user = db.Users.Where(u => u.Id == apply.StudentID).First();
                    selectedCourse.StudentsNames = String.Concat(user.FirstName, " ", user.LastName);
                }
                else
                {
                    selectedCourse.Students = String.Concat(selectedCourse.Students, ",", apply.StudentID);
                    var user = db.Users.Where(u => u.Id == apply.StudentID).First();
                    selectedCourse.StudentsNames = String.Concat(selectedCourse.StudentsNames,",",user.FirstName, " ", user.LastName);
                }
                db.Courses.AddOrUpdate(course => course.CourseID, selectedCourse);

            }
           
            db.Entry(apply).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplyExists(id))
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

        // POST: api/Application
        [ResponseType(typeof(Apply))]
        [HttpPost]
        [Authorize(Roles = "Student")]
        [Route("create", Name = "CreateApply")]
        public async Task<IHttpActionResult> PostApply(Apply apply)
        {
            apply.ApplyDate = DateTime.UtcNow;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Applications.Add(apply);
            await db.SaveChangesAsync();

            var student = db.Users.Where(u => u.Id == apply.StudentID.ToString()).First();
            if (student.Applies == null)
            {
                ICollection<Apply> applies = new Apply[] { apply };
                student.Applies = applies;
            }
            else
            {
                student.Applies.Add(apply);
            }

            db.Users.AddOrUpdate(user => user.UserName, student);
            await db.SaveChangesAsync();
            
            return CreatedAtRoute("CreateApply", new { id = apply.ApplyID }, apply);
        }

        // DELETE: api/Application/5
        [ResponseType(typeof(Apply))]
        [HttpDelete]
        [Route("delete/{id:guid}")]
        [Authorize(Roles = "Student,Admin")]
        public async Task<IHttpActionResult> DeleteApply(Guid id)
        {
            Apply apply = await db.Applications.FindAsync(id);
            if (apply == null)
            {
                return NotFound();
            }
            Selection[] selections = apply.Selections.ToArray();
            foreach (var item in selections)
            {
                db.Selections.Remove(item);
            }

            Guid courseID = apply.Selections.ElementAt(0).CourseID;
            Course selectedCourse = db.Courses.Where(c => c.CourseID == courseID).First();

            if (selectedCourse.Students != null)
            {
                string[] students = selectedCourse.Students.Split(',');
                selectedCourse.Students = "";
                selectedCourse.StudentsNames = "";
                var user = db.Users.Where(u => u.Id == apply.StudentID).First();
                foreach (var item in students)
                {
                    if (item != apply.StudentID)
                    {
                        selectedCourse.Students = String.Concat(selectedCourse.Students, ",", apply.StudentID);
                        selectedCourse.StudentsNames = String.Concat(selectedCourse.StudentsNames, ",", user.FirstName, " ", user.LastName);
                    }
                }
               
            }

            db.Courses.AddOrUpdate(course => course.CourseID, selectedCourse);
            apply.Selections = null;
            db.Applications.Remove(apply);
            await db.SaveChangesAsync();

            return Ok(apply);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApplyExists(Guid id)
        {
            return db.Applications.Count(e => e.ApplyID == id) > 0;
        }
    }
}