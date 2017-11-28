using Project.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service.Common
{
    public interface IApplyService
    {
        Task<IEnumerable<IApply>> GetAllAsync();
        Task<IApply> GetAsync(Guid id);
        Task<IApply> UpdateAsync(IApply apply);
        Task<IApply> CreateAsync(IApply apply);
        Task<int> DeleteAsync(Guid id);
}
}
