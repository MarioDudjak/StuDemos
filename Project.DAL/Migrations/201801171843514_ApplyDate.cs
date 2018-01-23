namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ApplyDate : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Applies", "ApplyDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Applies", "ApplyDate", c => c.DateTime(nullable: false));
        }
    }
}
