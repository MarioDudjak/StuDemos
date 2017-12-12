using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using Project.WebAPI.App_Start;
using System.Web.Http;

[assembly: OwinStartup(typeof(Project.WebAPI.Startup))]

namespace Project.WebAPI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            OAuthTokenConfig.ConfigureOAuthTokenGeneration(app);
            OAuthTokenConfig.ConfigureOAuthTokenConsumption(app);
            HttpConfiguration config = new HttpConfiguration();

            WebApiConfig.Register(config);
            

            //app.UseWebApi(config);
            //Adds a CORS middleware to your web application pipeline to allow cross domain requests.
            app.UseCors(CorsOptions.AllowAll); 
            app.UseNinjectMiddleware(() => NinjectConfig.CreateKernel.Value);
            app.UseNinjectWebApi(config);
        }

      
    }
}