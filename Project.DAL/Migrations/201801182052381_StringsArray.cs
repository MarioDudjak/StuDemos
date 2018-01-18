namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StringsArray : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Courses", "Professors", c => c.String());
            AddColumn("dbo.Courses", "ProfessorsNames", c => c.String());
            AddColumn("dbo.Courses", "Students", c => c.String());
            AddColumn("dbo.Courses", "StudentsNames", c => c.String());
            AddColumn("dbo.Courses", "ProfessorsCodes", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Courses", "ProfessorsCodes");
            DropColumn("dbo.Courses", "StudentsNames");
            DropColumn("dbo.Courses", "Students");
            DropColumn("dbo.Courses", "ProfessorsNames");
            DropColumn("dbo.Courses", "Professors");
        }
    }
}
