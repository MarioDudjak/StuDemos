using AutoMapper;
using Project.Model.Common;
using Project.Service.Common;
using Project.WebAPI.ViewModels;
using System.Threading.Tasks;
using System.Web.Http;

namespace Project.WebAPI.Controllers
{
    [RoutePrefix("api/student")]
    public class StudentController : ApiController
    {

        #region Constructors
    
        public StudentController(IStudentService studentService, IMapper mapper)
        {
            StudentService = studentService;
            Mapper = mapper;
        }

        #endregion Constructors

        #region Properties

        protected IStudentService StudentService { get; private set; }
        private readonly IMapper Mapper;

        #endregion Properties

        #region Methods
       
        // POST: api/Student/create
        [HttpPost]
        [Route("create")]
        public async Task<IHttpActionResult> Create(StudentVM student)
        { 
            var newStudentID = await StudentService.CreateAsync(Mapper.Map<StudentVM, IStudent>(student));
            if (newStudentID!=0)
            {
                return Created<int>(Request.RequestUri + newStudentID.ToString(), newStudentID);
            }
            else
            {
                return Conflict();
            }
        }
        #endregion Methods

    }
}
