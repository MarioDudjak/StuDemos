using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project.WebAPI.App_Start
{
    public class NinjectConfig
    {
        public static Lazy<IKernel> CreateKernel = new Lazy<IKernel>(() =>
        {
            var settings = new NinjectSettings()
            {
                LoadExtensions = true
            };
            settings.ExtensionSearchPatterns = settings.ExtensionSearchPatterns.Union(new string[] { "Project.*.dll" }).ToArray();

            var kernel = new StandardKernel(settings);
            return kernel;
        });
    }
}