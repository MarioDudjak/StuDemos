using System;

namespace Project.DAL.Entities
{
    public class StudentEntity 
    {
        public Guid StudentId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
