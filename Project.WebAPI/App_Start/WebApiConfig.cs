﻿using FluentValidation.WebApi;
using Project.WebAPI.App_Start;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Project.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            // Web API routes
            config.MapHttpAttributeRoutes();

            // Add Custom validation filters  
            config.Filters.Add(new ValidateModelStateFilter());
            FluentValidationModelValidatorProvider.Configure(config);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            EnableCorsAttribute cors = new EnableCorsAttribute("http://localhost:4200", "*", "GET,POST");
            config.EnableCors(cors);

            config.Formatters.JsonFormatter
            .SerializerSettings
            .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }
    }
}
