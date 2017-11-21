﻿using Project.Service.Common;
using System;
using System.Threading.Tasks;
using Project.Model.Common;
using Project.Repository.Common;

namespace Project.Service
{
    public class StudentService : IStudentService
    {
        #region Constructors

        public StudentService(IStudentRepository repository)
        {
            Repository = repository;
        }

        #endregion Constructors

        #region Properties

        protected IStudentRepository Repository { get; private set; }

        #endregion Properties

        #region Methods
        public async Task<int> CreateAsync(IStudent user)
        {
            return await Repository.CreateAsync(user);
            //Tu treba provjeriti jel možda već postoji
        }

        #endregion Methods
    }
}
