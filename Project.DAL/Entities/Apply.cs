using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.DAL.Entities
{
    public class Apply
    {
       
        public Guid ApplyID { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public double GradeAverage { get; set; }

        public int NumberOfApplyHours { get; set; }
        public int ApplyStatus { get; set; }
        public DateTime ApplyDate { get; set; }
        public virtual ICollection<Selection> Selections { get; set; }
        public Guid StudentID { get; set; }

    }
}
