using AutoMapper;
using Ninject.Modules;
using Project.DAL.Entities;
using Project.Model;
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
                config.CreateMap<ICourse, CourseVM>().ReverseMap();
                config.CreateMap<ISelection, SelectionVM>().ReverseMap();
                config.CreateMap<IApply, ApplyVM>().ReverseMap();
            
                config.CreateMap<ApplyPOCO, IApply>().ReverseMap();
                config.CreateMap<SelectionPOCO, ISelection>().ReverseMap();
                config.CreateMap<CoursePOCO, ICourse>().ReverseMap();

                config.CreateMap<CoursePOCO, Course>().ReverseMap();
                config.CreateMap<SelectionPOCO, Selection>().ReverseMap();
                config.CreateMap<ApplyPOCO, Apply>().ReverseMap();

                config.CreateMap<ICourse, Course>().ReverseMap();
                config.CreateMap<ISelection, Selection>().ReverseMap();
                config.CreateMap<IApply, Apply>().ReverseMap();

                config.CreateMap<IApplicationUser, ApplicationUserPOCO>().ReverseMap();
                config.CreateMap<IApplicationUser, CreateUserVM>().ReverseMap();
                config.CreateMap<IApplicationUser, ApplicationUser>().ReverseMap();
                config.CreateMap<ApplicationUserPOCO, ApplicationUser>().ReverseMap();

                config.CreateMap<CreateUserVM, ApplicationUser>().ReverseMap();
                config.CreateMap<IApplicationUser,CreateUserVM>().ReverseMap();







            });

            return Mapper.Instance;
        } 
    }
}