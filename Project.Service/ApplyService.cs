using Project.Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Model.Common;
using Project.Repository.Common;

namespace Project.Service
{
    public class ApplyService : IApplyService
    {
        #region Constructors

        public ApplyService(IApplyRepository repository)
        {
            Repository = repository;
        }

        #endregion Constructors

        #region Properties

        protected IApplyRepository Repository { get; private set; }

        #endregion Properties

        public async Task<IApply> CreateAsync(IApply apply)
        {
            return await Repository.CreateAsync(apply);
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            return await Repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<IApply>> GetAllAsync()
        {
            return await Repository.GetAllAsync();
        }

        public async Task<IApply> GetAsync(Guid id)
        {
            return await Repository.GetAsync(id);
        }

        public async Task<IApply> UpdateAsync(IApply apply)
        {
            return await Repository.UpdateAsync(apply);
        }
    }
}
