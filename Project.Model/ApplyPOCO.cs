using Project.Common.Enums;
using Project.Model.Common;
using System;
using System.Collections.Generic;

namespace Project.Model
{
    public class ApplyPOCO : IApply
    {
        public Guid ApplyID { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public double GradeAverage { get; set; }

        public int NumberOfApplyHours { get; set; }

        public DateTime ApplyDate { get; set; }
        public ApplyStatus ApplyStatus { get; set; }
        public ICollection<ISelection> Selections { get; set; }

        public IApplicationUser Student { get; set; }
    }
}
