using System;
using System.Collections.Generic;

namespace Project.DAL.Entities
{
    public class Apply
    {
        public Guid ApplyID { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public double GradeAverage { get; set; }

        public int NumberOfApplyHours { get; set; }
        public ApplyStatus ApplyStatus { get; set; }
        public DateTime ApplyDate { get; set; }
        public virtual ICollection<Selection> Selections { get; set; }
        public virtual ApplicationUser Student { get; set; }

    }
}
