using AutoMapper;
using Ninject.Modules;
using Project.Model.Common;

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
                config.CreateMap<IStudent, StudentVM>().ReverseMap();
            });

            return Mapper.Instance;
        } 
    }
}