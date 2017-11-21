using Project.Repository.Common;
using System;
using System.Threading.Tasks;
using Project.Model.Common;
using AutoMapper;
using Project.DAL.Entities;

namespace Project.Repository
{
    public class StudentRepository: IStudentRepository
    {

        #region Constructors
        public StudentRepository(IGenericRepository genericRepository, IMapper mapper)
        {
            GenericRepository = genericRepository;
            Mapper = mapper;
        }
        #endregion Constructors

        #region Properties
        protected IGenericRepository GenericRepository { get; private set; }
        #endregion Properties

        #region Fields
        private readonly IMapper Mapper;
        #endregion Fields

        #region Methods

        /// <summary>
        /// Creates a new student.
        /// </summary>
        /// <param name="student">Student which will be created.</param>
        /// <returns></returns>
        public async Task<int> CreateAsync(IStudent student)
        {
            student.StudentId = Guid.NewGuid();
            var studentEntity = Mapper.Map<IStudent, StudentEntity>(student);
            return await GenericRepository.AddAsync<StudentEntity>(studentEntity);
        }
        #endregion Methods

    }
}
