namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CourseTerm : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CourseTerms",
                c => new
                    {
                        CourseTermID = c.Guid(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Time = c.DateTime(nullable: false),
                        CourseCode = c.String(nullable: false),
                        CourseID = c.Guid(nullable: false),
                        StudentID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.CourseTermID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CourseTerms");
        }
    }
}
