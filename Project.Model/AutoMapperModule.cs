using AutoMapper;
using Ninject.Modules;
using Project.DAL.Entities;
using Project.Model.Common;

namespace Project.Model
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
               
                config.CreateMap<StudentPOCO, IStudent>().ReverseMap();
                config.CreateMap<ApplyPOCO, IApply>().ReverseMap();
                config.CreateMap<SelectionPOCO, ISelection>().ReverseMap();
                config.CreateMap<CoursePOCO, ICourse>().ReverseMap();

                config.CreateMap<ApplyPOCO, Apply>().ReverseMap();
                config.CreateMap<SelectionPOCO, Selection>().ReverseMap();
                config.CreateMap<CoursePOCO, Course>().ReverseMap();

                config.CreateMap<IApply, Apply>().ReverseMap();
                config.CreateMap<ISelection, Selection>().ReverseMap();
                config.CreateMap<ICourse, Course>().ReverseMap();



            });

            return Mapper.Instance;
        }
    
}
}
