using Application.Auth.Queries.Validators;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));

            }).AddFluentValidation(option =>
            {
                option.RegisterValidatorsFromAssemblyContaining<LoginQueryValidator>();
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                 policy.WithOrigins("http://localhost:4200")
                 .SetIsOriginAllowedToAllowWildcardSubdomains()
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .AllowCredentials()
                );
            });

            return services;
        }
    }
}