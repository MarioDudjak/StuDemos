using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project.DAL.Entities
{
    public class Course
    {
        public Guid CourseID { get; set; }
        public string CourseCode { get; set; }
        public string Semester { get; set; }
        public string CourseName { get; set; }
        public string StudyLevel { get; set; }
        public virtual ICollection<ApplicationUser> Users { get; set; }

    }
}
