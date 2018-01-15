using System;

namespace Project.WebAPI.ViewModels
{
    public class SelectionVM
    {
        public Guid SelectionID { get; set; }
        public int Priority { get; set; }
        public int CourseGrade { get; set; }
        public CourseVM Course { get; set; }
       // public ICollection<ApplyVM> Applications { get; set; }
    }
}