using Project.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Project.DAL.Mappings
{
    class CourseEntityMap : EntityTypeConfiguration<Course>
    {
        public CourseEntityMap()
        {
            //Configure primary key
            HasKey(entity => entity.CourseID);
            Property(entity => entity.CourseID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);


            //properties
            Property(entity => entity.CourseName).IsRequired();
            Property(entity => entity.StudyLevel).IsRequired();
            Property(entity => entity.CourseCode).IsRequired();
            Property(entity => entity.Semester).IsRequired();

            //table
            ToTable("Courses");
        }
    }
}