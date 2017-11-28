using Ninject.Extensions.Factory;
using Project.Repository.Common;

namespace Project.Repository
{
    public class DIModule : Ninject.Modules.NinjectModule
    {
        public override void Load()
        {
            Bind<IGenericRepository>().To<GenericRepository>();
            Bind<IStudentRepository>().To<StudentRepository>();
            Bind<IApplyRepository>().To<ApplyRepository>();
            Bind<IUnitOfWork>().To<UnitOfWork>();
            Bind<IUnitOfWorkFactory>().ToFactory();
        }
    }
}
