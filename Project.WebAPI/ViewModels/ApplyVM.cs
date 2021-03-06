﻿using Project.DAL.Entities;
using System;
using System.Collections.Generic;

namespace Project.WebAPI.ViewModels
{
    public class ApplyVM
    {
        public Guid ApplyID { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public double GradeAverage { get; set; }

        public int NumberOfApplyHours { get; set; }

        public DateTime ApplyDate { get; set; }
        public int  ApplyStatus { get; set; }
        public  ICollection<SelectionVM> Selections { get; set; }
    }
}