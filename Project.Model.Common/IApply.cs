using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Model.Common
{
    public interface IApply
    {
        string FirstName { get;}
        string SecondName { get;}
        double GradeAverage { get; }
        int NumberOfApplyHours { get; }

        
        DateTime ApplyDate { get; set; }

        ICollection<ISelection> Selections { get; set; }


    }
}
