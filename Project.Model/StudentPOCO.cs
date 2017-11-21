using System;
using Project.Model.Common;

namespace Project.Model
{
    public class StudentPOCO : IStudent
    {
        public Guid StudentId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
