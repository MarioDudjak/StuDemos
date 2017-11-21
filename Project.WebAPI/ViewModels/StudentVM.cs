using FluentValidation.Attributes;
using Project.WebAPI.Validators;
using System;

namespace Project.WebAPI.ViewModels
{
    [Validator(typeof(StudentValidator))]

    public class StudentVM
    {
        public Guid StudentId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }


    }
}