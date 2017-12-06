using Project.Service.Common;
using System;
using System.Collections.Generic;
using Project.Repository;
using Project.Model.Common;
using System.Threading.Tasks;

namespace Project.Service
{
    public class ApplicationUserService : IApplicationUserService
    {
        #region Constructors
        public ApplicationUserService()
        {
                //tu bi bilo dobro u konstruktor ubacit interfejs pa u DI modulu napravit ovu liniju
        }
        #endregion Constructors

        #region Fields
        //private ApplicationUserManager AppUserManager;
        #endregion Fields
        public Task<IApplicationUser> CreateUser(IApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public Task<IApplicationUser> GetUserAsync(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<IApplicationUser> GetUserByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<IApplicationUser>> GetUsersAsync()
        {
            throw new NotImplementedException();
        }
    }
}
