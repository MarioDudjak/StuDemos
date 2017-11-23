namespace Project.Model.Common
{
    public interface ISelection
    {
        int Priority { get; }
        ICourse Course { get; }
        int CourseGrade { get; }
    }
}
