using Project.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Model.Common
{
    public interface IApply
    {
        Guid ApplyID { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        double GradeAverage { get; set; }
        int NumberOfApplyHours { get; set; }

        DateTime ApplyDate { get; set; }
        ApplyStatus ApplyStatus { get; set; }
        ICollection<ISelection> Selections { get; set; }

        IApplicationUser Student { get; set; }

    }
}
