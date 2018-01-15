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
        [Route("create")]
        public async Task<IHttpActionResult> PostApply(Apply apply)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Applications.Add(apply);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = apply.ApplyID }, apply);
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