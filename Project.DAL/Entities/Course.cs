using System;
using System.ComponentModel.DataAnnotations;

namespace Project.DAL.Entities
{
    public class Course
    {
        public Guid CourseID { get; set; }
        public Guid SelectionId { get; set; }
        [Required]
        public string CourseName { get; set; }
        [Required]
        public string StudyLevel { get; set; }
        public virtual Selection Selection { get; set; }

    }
}
