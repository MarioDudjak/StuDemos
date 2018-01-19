using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Entities
{
    public class CourseTerm
    {
        public Guid CourseTermID { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string CourseCode { get; set; }
        public Guid CourseID { get; set; }
        public string StudentID { get; set; }
    }
}
