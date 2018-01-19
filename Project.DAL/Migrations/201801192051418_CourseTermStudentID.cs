namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CourseTermStudentID : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.CourseTerms", "StudentID", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.CourseTerms", "StudentID", c => c.Guid(nullable: false));
        }
    }
}
