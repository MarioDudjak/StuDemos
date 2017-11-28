namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedApplyStatus : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Applications", "ApplyStatus", c => c.Int(nullable: false, defaultValue: 0));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Applications", "ApplyStatus");
        }
    }
}
