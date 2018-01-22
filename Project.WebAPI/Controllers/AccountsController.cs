using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Project.DAL;
using Project.DAL.Entities;
using Project.DAL.Identity;
using Project.WebAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Project.WebAPI.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : ApiController
    {

        protected ApplicationUserManager AppUserManager
        {
            get
            {
                return _AppUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }


        protected ApplicationRoleManager AppRoleManager
        {
            get
            {
                return _AppRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
            }
        }
    

    #region Constructors
    public AccountsController(IMapper mapper)
        {
            Mapper = mapper;
        }
       
        #endregion Constructors
        #region Fields
        private readonly IMapper Mapper;
        private ApplicationUserManager _AppUserManager = null;
        private ApplicationRoleManager _AppRoleManager = null;
        private StuDemosDbContext db = new StuDemosDbContext();
        #endregion Fields

        [Authorize]
        [Authorize(Roles = "Admin")]
        [Route("users", Name = "GetUsers")]
 
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.ToList().Select(u => u));
        }

        [Authorize]
        [Authorize(Roles = "Admin")]
        [Route("professors", Name = "GetProfessors")]
        public IHttpActionResult GetProfessors()
        {
            var users = this.AppUserManager.Users.Where(u => u.RoleName == "Professor").ToList();
            var newUsers = this.AppUserManager.Users.Where(u => u.RoleName == "Professor").ToList();
            int i = 0;
            foreach (var item in users)
            {
                var courses = db.Courses.Where(c => c.Professors.Contains(item.Id)).ToList();
                newUsers[i].Courses = courses;
                i++;
            }

            return Ok(users);
        }

        [Authorize]
        [Authorize(Roles = "Admin")]
        [Route("students", Name = "GetStudents")]
        public IHttpActionResult GetStudents()
        {
            return Ok(this.AppUserManager.Users.Where(u => u.RoleName == "Student").ToList());
        }

        [Route("user/{id:guid}", Name = "GetUserById")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            var user = await this.AppUserManager.FindByIdAsync(Id);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();

        }
        [Authorize]
        [Route("user/{username}")]
        public async Task<IHttpActionResult> GetUserByName(string username)
        {
            var user = await this.AppUserManager.FindByNameAsync(username);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();

        }
        [AllowAnonymous]
        [Route("create")]
        public async Task<IHttpActionResult> CreateUser(CreateUserVM createUserModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = createUserModel.UserName,
                Email = createUserModel.Email,
                FirstName = createUserModel.FirstName,
                LastName = createUserModel.LastName,
                JoinDate = DateTime.UtcNow,
                RoleName = createUserModel.RoleName,
                EmailConfirmed =true, 
            };
            

            IdentityResult addUserResult = await AppUserManager.CreateAsync(user ,createUserModel.Password);

            if (!addUserResult.Succeeded)
            {
               return GetErrorResult(addUserResult);
            }

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));
            return Created(locationHeader, user);

        }

        [Route("user/{id:guid}/roles")]
        [HttpPut]
        public async Task<IHttpActionResult> AssignRolesToUser([FromUri] string id, [FromBody] string[] rolesToAssign)
        {

            var appUser = await this.AppUserManager.FindByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            var currentRoles = await this.AppUserManager.GetRolesAsync(appUser.Id);

            var rolesNotExists = rolesToAssign.Except(this.AppRoleManager.Roles.Select(x => x.Name)).ToArray();

            if (rolesNotExists.Count() > 0)
            {

                ModelState.AddModelError("", string.Format("Roles '{0}' does not exixts in the system", string.Join(",", rolesNotExists)));
                return BadRequest(ModelState);
            }

            IdentityResult removeResult = await this.AppUserManager.RemoveFromRolesAsync(appUser.Id, currentRoles.ToArray());

            if (!removeResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to remove user roles");
                return BadRequest(ModelState);
            }

            IdentityResult addResult = await this.AppUserManager.AddToRolesAsync(appUser.Id, rolesToAssign);

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                return BadRequest(ModelState);
            }

            return Ok();
        }
        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
