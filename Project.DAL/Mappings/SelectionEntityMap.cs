using Project.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Project.DAL.Mappings
{
    public class SelectionEntityMap: EntityTypeConfiguration<Selection>
    {
        public SelectionEntityMap()
        {
            //Configure primary key
            HasKey(entity => entity.SelectionID);
            Property(entity => entity.SelectionID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            //properties
            Property(entity => entity.CourseGrade).IsRequired();
            Property(entity => entity.Priority).IsRequired();
            Property(entity => entity.CourseName).IsRequired();
            //relationship
            

            //table
            ToTable("Selections");
        }
    
    }
}