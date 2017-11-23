using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project.DAL.Entities
{
    public class Apply
    {
        [Key]
        public Guid ApplyID { get; set; }
        //public Guid StudentId { get; set; }
        [Required]
        public string FirstName { get; }
        [Required]

        public string LastName { get; }
        [Required]

        public double GradeAverage { get; }
        [Required]

        public int NumberOfApplyHours { get; }
        [Required]

        public DateTime ApplyDate { get; set; }
        [Required]
        public virtual ICollection<Selection> Selections { get; set; }

        //public virtual Student;
    }
}
