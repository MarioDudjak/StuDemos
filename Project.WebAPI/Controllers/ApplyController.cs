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
    public class ApplyController : ApiController
    {
        private StuDemosDbContext db = new StuDemosDbContext();

        // GET: api/Apply
        public IQueryable<Apply> GetApplications()
        {
            return db.Applications;
        }

        // GET: api/Apply/5
        [ResponseType(typeof(Apply))]
        public async Task<IHttpActionResult> GetApply(Guid id)
        {
            Apply apply = await db.Applications.FindAsync(id);
            if (apply == null)
            {
                return NotFound();
            }

            return Ok(apply);
        }

        // PUT: api/Apply/5
        [ResponseType(typeof(void))]
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

        // POST: api/Apply
        [ResponseType(typeof(Apply))]
        public async Task<IHttpActionResult> PostApply(Apply apply)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Applications.Add(apply);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ApplyExists(apply.ApplyID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = apply.ApplyID }, apply);
        }

        // DELETE: api/Apply/5
        [ResponseType(typeof(Apply))]
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