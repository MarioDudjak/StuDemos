using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Model.Common
{
     public interface ICourse
    {
         Guid CourseID { get; set; }
         string CourseName { get; set; }
         string StudyLevel { get; set; }


    }
}
