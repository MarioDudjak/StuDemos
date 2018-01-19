namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Apply : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Applies", "StudentID", "dbo.AspNetUsers");
            DropIndex("dbo.Applies", new[] { "StudentID" });
            AlterColumn("dbo.Applies", "StudentID", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Applies", "StudentID", c => c.String(maxLength: 128));
            CreateIndex("dbo.Applies", "StudentID");
            AddForeignKey("dbo.Applies", "StudentID", "dbo.AspNetUsers", "Id");
        }
    }
}
