using System;
using System.Collections.Generic;

namespace Project.Model.Common
{
     public interface ISelection
    {
         Guid SelectionID { get; set; }
         int Priority { get; set; }
         int CourseGrade { get; set; }
         ICourse Course { get; set; }
         //ICollection<IApply> Applications { get; set; }
    }
}
