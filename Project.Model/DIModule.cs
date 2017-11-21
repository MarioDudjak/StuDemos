using Project.Model.Common;

namespace Project.Model
{
    public class DIModule : Ninject.Modules.NinjectModule
    {
        public override void Load()
        {
            Bind<IStudent>().To<StudentPOCO>();
        }
    }
}
