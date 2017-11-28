using Project.Model.Common;
using System;

namespace Project.Model
{
    public class CoursePOCO : ICourse
    {
        public Guid CourseID { get; set; }

        public string CourseName { get; set;  }
        public string StudyLevel { get; set; }
    }
}
