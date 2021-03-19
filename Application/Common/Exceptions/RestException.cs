using System;
using System.Net;

namespace Application.Common.Exceptions
{
    public class RestException : Exception
    {
        public RestException(HttpStatusCode statusCode, object errorMessage = null)
        {
            StatusCode = statusCode;
            ErrorMessage = errorMessage ?? GetDefaultErrorMessage((int)statusCode);
        }

        /// <summary>
        /// The status code to return
        /// </summary>
        public HttpStatusCode StatusCode { get; set; }

        /// <summary>
        /// The specified error message
        /// </summary>
        public object ErrorMessage { get; set; }

        /// <summary>
        /// Confirgures a default error message incase missing
        /// </summary>
        /// <param name="statusCode">The returned status code</param>
        /// <returns>A default error message</returns>
        private object GetDefaultErrorMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => new { message = "Bad Request", statusCode },
                401 => new { message = "Unauthorized", statusCode },
                404 => new { message = "Resource Not Found", statusCode },
                422 => new { message = "One or more validation errors occured", statusCode },
                500 => new { message = "Internal Server Error Occured", statusCode },
                _ => null
            };
        }
    }
}