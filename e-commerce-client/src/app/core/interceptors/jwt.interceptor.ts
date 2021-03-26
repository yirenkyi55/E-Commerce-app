import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem('authState'))?.auth
      ?.currentUser?.accessToken;

    // We search if the baseUrl is found, we can then add the bearer authorization header
    if (req.url.search(environment.apiUrl) >= 0) {
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      }
    }

    return next.handle(req);
  }
}
