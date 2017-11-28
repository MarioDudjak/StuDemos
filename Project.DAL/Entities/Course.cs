using System;
using System.ComponentModel.DataAnnotations;

namespace Project.DAL.Entities
{
    public class Course
    {
        public Guid CourseID { get; set; }
        public string CourseName { get; set; }
        public string StudyLevel { get; set; }

    }
}
