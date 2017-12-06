using Project.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service.Common
{
    public interface IApplicationUserService
    {
       Task<ICollection<IApplicationUser>> GetUsersAsync();
        Task<IApplicationUser> GetUserByNameAsync(string name);
        Task<IApplicationUser> GetUserAsync(string Id);
        Task<IApplicationUser> CreateUser(IApplicationUser user);

    }
}
