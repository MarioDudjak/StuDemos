using AutoMapper;
using Ninject.Modules;
using Project.DAL.Entities;


namespace Project.WebAPI.ViewModels
{
    public class AutoMapperModule : NinjectModule
    {
        
        public override void Load()
        {
            Bind<IMapper>().ToMethod(AutoMapper).InSingletonScope();
        }

        private IMapper AutoMapper(Ninject.Activation.IContext context)
        {
            Mapper.Initialize(config =>
            {
              
                config.CreateMap<CreateUserVM, ApplicationUser>().ReverseMap();

            });

            return Mapper.Instance;
        } 
    }
}