using Project.Model.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Project.Repository.Common
{
    public interface IApplyRepository
    {
        Task<IApply> CreateAsync(IApply apply);
        Task<IApply> GetAsync(Guid id);
        Task<IApply> UpdateAsync(IApply apply);
        Task<int> DeleteAsync(Guid id);
        Task<IEnumerable<IApply>> GetAllAsync();

    }
}
