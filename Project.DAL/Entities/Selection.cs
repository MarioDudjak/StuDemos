using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.DAL.Entities
{
    public class Selection
    {
        [Key, ForeignKey("Course")]
        public Guid SelectionID { get; set; }
        public Guid CourseID { get; set; }
        public Guid ApplyID { get; set; }

        [Required]
        public int Priority { get; }
        [Required]
        public virtual Course Course { get; set; }
        [Required]
        public int CourseGrade { get; }
        public virtual Apply Apply { get; set; }

    }
}
