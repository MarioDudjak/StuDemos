using Project.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Project.DAL.Mappings
{
    public class CourseTermEntityMap : EntityTypeConfiguration<CourseTerm>
    {
        public CourseTermEntityMap()
        {

            //Configure primary key
            HasKey(entity => entity.CourseTermID);

            Property(entity => entity.CourseTermID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            //properties
            Property(entity => entity.Date).IsRequired();
            //Generate value in migrations 
            Property(entity => entity.Time).IsRequired();
            Property(entity => entity.CourseCode).IsRequired();
            Property(entity => entity.CourseID).IsRequired();
            Property(entity => entity.StudentID).IsRequired();

        }
    }
}
