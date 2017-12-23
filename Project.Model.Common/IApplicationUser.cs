using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Model.Common
{
    public interface IApplicationUser
    {
        string Id { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        DateTime JoinDate { get; set; }
        ICollection<IApply> Applications { get; set; }

    }
}
