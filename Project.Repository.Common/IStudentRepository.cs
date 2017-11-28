using Project.Model.Common;
using System.Threading.Tasks;

namespace Project.Repository.Common
{
    public interface IStudentRepository
    {
        /// <summary>
        /// Creates a new student.
        /// </summary>
        /// <param name="student">Student which will be created.</param>
        /// <returns></returns>
        Task<IStudent> CreateAsync(IStudent student);
    }
}
