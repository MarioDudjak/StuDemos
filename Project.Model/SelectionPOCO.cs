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
        public int Priority {get ; }

        public ICourse Course {get ; }

        public int CourseGrade {get ; }
    }
}
