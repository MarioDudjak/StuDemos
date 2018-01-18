using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.DAL.Entities
{
    public class Course
    {
       
        public Guid CourseID { get; set; }
        public string CourseCode { get; set; }
        public string Semester { get; set; }
        public string CourseName { get; set; }
        public string StudyLevel { get; set; }
        public string Professors { get; set; }
        public string ProfessorsNames { get; set; }
        public string Students { get; set; }
        public string StudentsNames { get; set; }
        public string ProfessorsCodes { get; set; }


    }
}
