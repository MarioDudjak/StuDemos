namespace Project.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProfessorID : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ApplicationUserCourses", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.ApplicationUserCourses", "Course_CourseID", "dbo.Courses");
            DropIndex("dbo.ApplicationUserCourses", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.ApplicationUserCourses", new[] { "Course_CourseID" });
            AddColumn("dbo.Courses", "ApplicationUser_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.AspNetUsers", "IdentificationNumber", c => c.String());
            AddColumn("dbo.AspNetUsers", "Course_CourseID", c => c.Guid());
            AddColumn("dbo.AspNetUsers", "Course_CourseID1", c => c.Guid());
            CreateIndex("dbo.Courses", "ApplicationUser_Id");
            CreateIndex("dbo.AspNetUsers", "Course_CourseID");
            CreateIndex("dbo.AspNetUsers", "Course_CourseID1");
            AddForeignKey("dbo.Courses", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.AspNetUsers", "Course_CourseID", "dbo.Courses", "CourseID");
            AddForeignKey("dbo.AspNetUsers", "Course_CourseID1", "dbo.Courses", "CourseID");
            DropTable("dbo.ApplicationUserCourses");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ApplicationUserCourses",
                c => new
                    {
                        ApplicationUser_Id = c.String(nullable: false, maxLength: 128),
                        Course_CourseID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.ApplicationUser_Id, t.Course_CourseID });
            
            DropForeignKey("dbo.AspNetUsers", "Course_CourseID1", "dbo.Courses");
            DropForeignKey("dbo.AspNetUsers", "Course_CourseID", "dbo.Courses");
            DropForeignKey("dbo.Courses", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropIndex("dbo.AspNetUsers", new[] { "Course_CourseID1" });
            DropIndex("dbo.AspNetUsers", new[] { "Course_CourseID" });
            DropIndex("dbo.Courses", new[] { "ApplicationUser_Id" });
            DropColumn("dbo.AspNetUsers", "Course_CourseID1");
            DropColumn("dbo.AspNetUsers", "Course_CourseID");
            DropColumn("dbo.AspNetUsers", "IdentificationNumber");
            DropColumn("dbo.Courses", "ApplicationUser_Id");
            CreateIndex("dbo.ApplicationUserCourses", "Course_CourseID");
            CreateIndex("dbo.ApplicationUserCourses", "ApplicationUser_Id");
            AddForeignKey("dbo.ApplicationUserCourses", "Course_CourseID", "dbo.Courses", "CourseID", cascadeDelete: true);
            AddForeignKey("dbo.ApplicationUserCourses", "ApplicationUser_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
