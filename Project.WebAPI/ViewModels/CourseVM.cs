using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project.WebAPI.ViewModels
{
    public class CourseVM
    {
        public Guid CourseID { get; set; }

        public string CourseName { get; set; }
        public string StudyLevel { get; set; }
    
}
}