namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Students");
            AddColumn("dbo.Courses", "StudyLevel", c => c.String(nullable: false));
            AddColumn("dbo.Students", "StudentId", c => c.Guid(nullable: false, identity: true));
            AddPrimaryKey("dbo.Students", "StudentId");
            DropColumn("dbo.Students", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Students", "UserId", c => c.Guid(nullable: false, identity: true));
            DropPrimaryKey("dbo.Students");
            DropColumn("dbo.Students", "StudentId");
            DropColumn("dbo.Courses", "StudyLevel");
            AddPrimaryKey("dbo.Students", "UserId");
        }
    }
}
