using Project.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Project.DAL.Mappings
{
    public class StudentEntityMap : EntityTypeConfiguration<StudentEntity>
    {
        public StudentEntityMap()
        {
            // key
            HasKey(entity => entity.StudentId);
            Property(entity => entity.StudentId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            //properties
            Property(entity => entity.Username).IsRequired();
            Property(entity => entity.Email).IsRequired();
            Property(entity => entity.Password).IsRequired();

            //table
            ToTable("Students");

        }
    }
}
