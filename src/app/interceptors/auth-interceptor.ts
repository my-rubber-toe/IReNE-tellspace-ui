import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

/**HTTP Interceptor that adds a authorization header to any http request if an access token exists */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + access_token),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
