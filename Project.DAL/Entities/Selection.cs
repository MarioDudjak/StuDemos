using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.DAL.Entities
{
    public class Selection
    {
        public Guid SelectionID { get; set; }
        public int Priority { get; set; }
        public int CourseGrade { get; set; }
        public virtual Course Course { get; set; }
        //public virtual ICollection<Apply> Applications { get; set; }


    }
}
