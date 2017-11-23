﻿using Project.DAL.Entities;
using Project.DAL.Mappings;
using System;
using System.Data.Entity;

namespace Project.DAL
{
    public class StuDemosDbContext : DbContext, IDbContext
    {
        public StuDemosDbContext() : base("name=StuDemosDbConnectionString") { }

        public static StuDemosDbContext Create()
        {
            return new StuDemosDbContext();
        }

        public DbSet<StudentEntity> Students { get; set; }
        public DbSet<Apply> Applications { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Selection> Selections { get; set; }



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new StudentEntityMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}
