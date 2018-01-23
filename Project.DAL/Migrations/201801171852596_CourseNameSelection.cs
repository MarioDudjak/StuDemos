namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CourseNameSelection : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Selections", "CourseName", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Selections", "CourseName");
        }
    }
}
