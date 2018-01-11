namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CourseUpdated : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Courses", "CourseCode", c => c.String());
            AddColumn("dbo.Courses", "Semester", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Courses", "Semester");
            DropColumn("dbo.Courses", "CourseCode");
        }
    }
}
