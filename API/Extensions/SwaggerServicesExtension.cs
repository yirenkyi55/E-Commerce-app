using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Hosting;

namespace API.Extensions
{
    public static class SwaggerServicesExtension
    {
        public static IServiceCollection AddSwaggerServices(this IServiceCollection services)
        {
            var apiVersionDescription = services.BuildServiceProvider()
            .GetService<IApiVersionDescriptionProvider>();

            services.AddSwaggerGen(options =>
            {
                foreach (var description in apiVersionDescription.ApiVersionDescriptions)
                {
                    options.SwaggerDoc($"ECommerceApiSpec{description.GroupName}",
                    new OpenApiInfo
                    {
                        Title = "ECommerce Web Service API",
                        Version = description.ApiVersion.ToString(),
                        Description = "This API Provides end-points for interacting with the E-Commerce App"
                    });

                    options.DocInclusionPredicate((documentName, apiDescription) =>
                    {
                        var actionApiVersionModel = apiDescription.ActionDescriptor
                        .GetApiVersionModel(ApiVersionMapping.Explicit |
                        ApiVersionMapping.Implicit);

                        if (actionApiVersionModel.DeclaredApiVersions.Any())
                        {
                            return actionApiVersionModel.DeclaredApiVersions
                            .Any(v => $"ECommerceApiSpecv{v}" == documentName);
                        }

                        return actionApiVersionModel.ImplementedApiVersions
                        .Any(v => $"ECommerceApiSpecv{v}" == documentName);
                    });
                }
            });

            return services;
        }


        public static IApplicationBuilder UseSwaggerDocumentation(
            this IApplicationBuilder app,
         IWebHostEnvironment env, IApiVersionDescriptionProvider provider)
        {
            if (env.IsDevelopment())
            {

                app.UseSwagger();

                app.UseSwaggerUI(setupAction =>
                {
                    foreach (var description in provider.ApiVersionDescriptions)
                    {
                        setupAction.SwaggerEndpoint($"/swagger/ECommerceApiSpec{description.GroupName}/swagger.json",
                            description.GroupName.ToUpperInvariant());
                    }
                });
            }

            return app;
        }
    }
}