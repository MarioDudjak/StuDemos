using Project.Service.Common;

namespace Project.Service
{
    public class DIModule : Ninject.Modules.NinjectModule
    {
        public override void Load()
        {
            Bind<IStudentService>().To<StudentService>();
            Bind<IApplyService>().To<ApplyService>();


        }
    }
}
