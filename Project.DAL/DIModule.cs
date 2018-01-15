using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Project.DAL.Entities;

namespace Project.DAL
{
    public class DIModule : Ninject.Modules.NinjectModule
    {
        public override void Load()
        {
           
            //Bind<IDbContext>().To<StuDemosDbContext>();
            
        }
    }
}
