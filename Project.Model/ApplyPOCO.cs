using Project.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Model
{
    public class ApplyPOCO : IApply
    {
        public string FirstName {get ; }

        public string SecondName {get ; }

        public double GradeAverage {get ; }

        public int NumberOfApplyHours {get ; }

        public DateTime ApplyDate { get; set; }
        public ICollection<ISelection> Selections { get; set; }
    }
}
