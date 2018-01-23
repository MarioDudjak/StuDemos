using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.DAL.Entities
{
    public class Selection
    {
  
        public Guid SelectionID { get; set; }
        public int Priority { get; set; }
        public int CourseGrade { get; set; }
        public string CourseName { get; set; }
        public Guid CourseID { get; set; }

    }
}
