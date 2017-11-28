using System;
using System.Threading.Tasks;
using System.Web.Http;
using Project.WebAPI.ViewModels;
using AutoMapper;
using Project.Model.Common;
using Project.Service.Common;

namespace Project.WebAPI.Controllers
{
    [RoutePrefix("api/apply")]

    public class ApplyController : ApiController
    {

        #region Constructors

        public ApplyController(IApplyService applyService, IMapper mapper)
        {
            ApplyService = applyService;
            Mapper = mapper;
        }
        #endregion Constructors
        #region Properties
        protected IApplyService ApplyService { get; private set; }
        private readonly IMapper Mapper;
        #endregion Properties

        #region Methods

        [HttpGet]
        [Route("get")]
        public async Task<IHttpActionResult> Get()
        {
            var result = await ApplyService.GetAllAsync();
            if (result != null)
            {
                // return Ok(Mapper.Map<List<IApply>, ApplyVM>(result.ToList()));
                return Ok(result);
            }
            else
            { 
                return NotFound();
            }
        }
        [HttpGet]
        [Route("getbyid/{id:guid}")]
        public async Task<IHttpActionResult> Get(Guid id)
        {
            var result = await ApplyService.GetAsync(id);
            if (result != null)
            {
                return Ok(Mapper.Map<IApply, ApplyVM>(result));
                
            }
            else
            {
                return BadRequest("Wrong ID");
            }
        }

       
        [HttpPost]
        [Route("create")]
        public async Task<IHttpActionResult> Create(ApplyVM apply)
        {
            var newApply = await ApplyService.CreateAsync(Mapper.Map<ApplyVM, IApply>(apply));
            if (newApply!=null)
            {
                return Ok(newApply);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("update")]
        public async Task<IHttpActionResult> Update(ApplyVM apply)
        {
            var newApply = await ApplyService.UpdateAsync(Mapper.Map<ApplyVM, IApply>(apply));
            if (newApply != null)
            {
                return Ok(newApply);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("delete/{id:guid}")]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            var result = await ApplyService.DeleteAsync(id);
            if (result == 1)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Wrong ID");
            }
        }
        #endregion Methods
    }
}