using Project.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Project.DAL.Mappings
{
    public class ApplyEntityMap : EntityTypeConfiguration<Apply>
    {
        public ApplyEntityMap()
        {
            //Configure primary key
            HasKey(entity => entity.ApplyID);
            Property(entity => entity.ApplyID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            //properties
            Property(entity => entity.ApplyDate).IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Computed);
            //Generate value in migrations 
            Property(entity => entity.FirstName).IsRequired();
            Property(entity => entity.LastName).IsRequired();
            Property(entity => entity.NumberOfApplyHours).IsRequired();
            Property(entity => entity.GradeAverage).IsRequired();
            Property(entity => entity.ApplyStatus).IsRequired();

            //relationship
            /*
            HasMany(entity => entity.Selections)
                .WithMany(entity => entity.Applications)
                .Map(entity =>
                {
                    entity.MapLeftKey("ApplicationRefId");
                    entity.MapRightKey("SelectionRefId");
                    entity.ToTable("ApplicationSelection");
                });
                */

            HasRequired<ApplicationUser>(s => s.Student)
                .WithMany(g => g.Applications);
            //table
            ToTable("Applications");
        }
    }
}
