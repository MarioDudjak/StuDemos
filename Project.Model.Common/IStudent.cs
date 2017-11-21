using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Model.Common
{
    public interface IStudent
    {
        Guid StudentId { get; set; }
        string Username { get; set; }
        string Email { get; set; }
        string Password { get; set; }
    }
}
