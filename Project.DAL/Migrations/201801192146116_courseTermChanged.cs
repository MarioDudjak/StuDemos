namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class courseTermChanged : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.CourseTerms", "Date", c => c.String(nullable: false));
            AlterColumn("dbo.CourseTerms", "Time", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.CourseTerms", "Time", c => c.DateTime(nullable: false));
            AlterColumn("dbo.CourseTerms", "Date", c => c.DateTime(nullable: false));
        }
    }
}
