using Project.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service.Common
{
    public interface IStudentService
    {
        /// <summary>
        /// Creates a new student asynchronously.
        /// </summary>
        /// <param name="student">Student to be created.</param>
        /// <returns></returns>
        Task<IStudent> CreateAsync(IStudent student);
    }
}
