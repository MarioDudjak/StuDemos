using Project.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

    }
}
