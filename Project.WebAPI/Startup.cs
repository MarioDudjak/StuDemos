using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using Project.DAL;
using Project.Repository;
using Project.WebAPI.App_Start;
using System.Web.Http;

[assembly: OwinStartup(typeof(Project.WebAPI.Startup))]

namespace Project.WebAPI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
            ConfigureOAuthTokenGeneration(app);
            //app.UseWebApi(config);
            //Adds a CORS middleware to your web application pipeline to allow cross domain requests.
            app.UseCors(CorsOptions.AllowAll); 
            app.UseNinjectMiddleware(() => NinjectConfig.CreateKernel.Value);
            app.UseNinjectWebApi(config);
        }

        private void ConfigureOAuthTokenGeneration(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(StuDemosDbContext.Create);

            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Plugin the OAuth bearer JSON Web Token tokens generation and Consumption will be here

        }


    }
}