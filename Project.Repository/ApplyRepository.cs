using AutoMapper;
using Project.DAL.Entities;
using Project.Model;
using Project.Model.Common;
using Project.Repository.Common;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Project.Repository
{
    public class ApplyRepository :IApplyRepository
    {
        #region Constructors
        public ApplyRepository(IGenericRepository genericRepository, IMapper mapper)
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
        /// Creates the specified apply asynchronously.
        /// </summary>
        /// <param name="apply">Apply to be created</param>
        /// <returns></returns>
        public async Task<IApply> CreateAsync(IApply apply)
        {
            var applyEntity = Mapper.Map<IApply, Apply>(apply);
            var result = await GenericRepository.AddAsync<Apply>(applyEntity);
            return Mapper.Map<Apply, IApply>(result);
        }

        /// <summary>
        /// Gets a single apply asynchronously using the id specified.
        /// </summary>
        /// <param name="id">Identifier of the apply to be retrieved.</param>
        /// <returns>The apply.</returns>
        public virtual async Task<IApply> GetAsync(Guid id)
        {
            var result = await GenericRepository.GetByIDAsync<Apply>(id);

            return Mapper.Map<Apply, ApplyPOCO>(result);
        }

        

        /// <summary>
        /// Updates the specified apply asynchronously.
        /// </summary>
        /// <param name="apply">Apply to be updated.</param>
        /// <returns></returns>
        public virtual async Task<IApply> UpdateAsync(IApply apply)
        {
            var applyEntity = Mapper.Map<IApply, Apply>(apply);
            var result = await GenericRepository.UpdateAsync<Apply>(applyEntity);
            return Mapper.Map<Apply, IApply>(result);
        }

        /// <summary>
        /// Deletes the apply using the id specified asynchronously.
        /// </summary>
        /// <param name="id">The Identifier of the apply to be deleted.</param>
        /// <returns></returns>
        public virtual Task<int> DeleteAsync(Guid id)
        {
            return GenericRepository.DeleteAsync<Apply>(id);
        }

        /// <summary>
        /// Gets all applies.
        /// </summary>
        /// <param name="">No parameters.</param>
        /// <returns>List of applies.</returns>
        public async Task<IEnumerable<IApply>> GetAllAsync()
        {
            return Mapper.Map<IEnumerable<ApplyPOCO>>(await GenericRepository.GetWhere<Apply>().ToListAsync());
        }

       

        #endregion Methods  
    }
}

