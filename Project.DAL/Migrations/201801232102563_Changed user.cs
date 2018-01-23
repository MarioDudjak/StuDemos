namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Changeduser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Studies", c => c.String());
            AddColumn("dbo.AspNetUsers", "Year", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Year");
            DropColumn("dbo.AspNetUsers", "Studies");
        }
    }
}
