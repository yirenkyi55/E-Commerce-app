using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Helpers.Middlewares
{
    public class GlobalExceptionMiddleware
    {
        private readonly IHostEnvironment _hostEnvironment;

        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        private readonly RequestDelegate _next;

        public GlobalExceptionMiddleware(IHostEnvironment hostEnvironment,
            ILogger<GlobalExceptionMiddleware> logger, RequestDelegate next)
        {
            _hostEnvironment = hostEnvironment;
            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {

                await ProcessException(context, exception, _logger);
            }
        }

        /// <summary>
        /// Handles all occuring exceptions
        /// </summary>
        /// <param name="context">The request context</param>
        /// <param name="exception">The exception that has been generated</param>
        /// <param name="logger">A logger function to log the exception</param>
        /// <returns></returns>
        private async Task ProcessException(HttpContext context, Exception exception, ILogger<GlobalExceptionMiddleware> logger)
        {
            object errorMessage = null;
            object detailMessage = null;

            switch (exception)
            {
                case RestException restException:
                    logger.LogWarning(exception, "Application Level Exception Occured...");
                    errorMessage = restException.ErrorMessage;
                    context.Response.StatusCode = (int)restException.StatusCode;
                    break;

                case Exception sysException:
                    logger.LogError(sysException, "Internal Error Exception Occured!!");
                    errorMessage = string.IsNullOrWhiteSpace(sysException.Message)
                        ? "Internal Server Error Occured" : sysException.Message;
                    detailMessage = _hostEnvironment.IsDevelopment() ? sysException.StackTrace : null;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;

            }

            if (errorMessage != null)
            {
                string response;

                if (detailMessage != null)
                {
                    // We send a detail message of the error for debuggin
                    response = JsonSerializer.Serialize(new
                    {
                        errors = new
                        {
                            statusCode = context.Response.StatusCode,
                            message = errorMessage,
                            detailMessage
                        }
                    });
                }
                else
                {
                    response = JsonSerializer.Serialize(new
                    {
                        errors = new
                        {
                            statusCode = context.Response.StatusCode,
                            message = errorMessage
                        }
                    });
                }

                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(response);
            }
        }
    }
}