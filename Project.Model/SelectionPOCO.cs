using Project.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Model
{
    public class SelectionPOCO : ISelection
    {
        public Guid SelectionID { get; set; }
        public int Priority { get; set; }
        public int CourseGrade { get; set; }
        public  ICourse Course { get; set; }
        //public ICollection<IApply> Applications { get; set; }
    }
}
