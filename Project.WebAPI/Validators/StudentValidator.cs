using FluentValidation;
using Project.WebAPI.ViewModels;

namespace Project.WebAPI.Validators
{
    public class StudentValidator : AbstractValidator<StudentVM>
    {
        /// <summary>  
        /// Validator rules for Student  
        /// </summary>  
        public StudentValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty()
                .WithMessage("The Student Name cannot be blank.")
                .Length(0, 30)
                .WithMessage("The Student Name cannot be more than 30 characters.");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("The Student Password must be set");
            //.Matches(); REGEX validation

            RuleFor(x => x.Email)
                        .NotEmpty()
                        .WithMessage("The Email cannot be blank.")
                        .EmailAddress()
                        .WithMessage("The Email must be in form of email");
        }
    }
}