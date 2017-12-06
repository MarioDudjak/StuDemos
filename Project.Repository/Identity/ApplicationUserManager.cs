using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

using Project.DAL;
using Project.DAL.Entities;
using System;
using Microsoft.Owin;
using Microsoft.AspNet.Identity.Owin;

namespace Project.Repository
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            try
            {
                var appDbContext = context.Get<StuDemosDbContext>();
                var appUserManager = new ApplicationUserManager(new UserStore<ApplicationUser>(appDbContext));
                return appUserManager;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
