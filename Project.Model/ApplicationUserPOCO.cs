using Project.Model.Common;
using System;
using System.Collections.Generic;

namespace Project.Model
{
    public class ApplicationUserPOCO : IApplicationUser
    {
        public string Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime JoinDate { get; set; }
        public ICollection<IApply> Applications { get; set; }
    }
}
