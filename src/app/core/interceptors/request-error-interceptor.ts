import { Injectable } from "@angular/core";
import { catchError, filter, retry, switchMap, take } from "rxjs/operators";
import { throwError, Observable, BehaviorSubject } from "rxjs";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";

/**Intercepts errors on all requests, catches 401 errors*/
@Injectable()
export class RequestErrorInterceptor implements HttpInterceptor {
  /**Access Token subject for requests that need to wait for a refresh to be completed */
  private accessTokenStream: BehaviorSubject<string> = new BehaviorSubject<
    string
  >(null);

  /**Flags if there is a refresh request being procesed, this ensures that there is only one of such requests at a time*/
  private isRefreshing: boolean;

  constructor(private auth: AuthenticationService, private router: Router) {}

  /**Main Interceptor Method */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem("access_token");
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && accessToken) {
          //if unauthorized try to refresh token.
          const refreshToken = localStorage.getItem("refreshToken");

          if (refreshToken) {
            return this.refreshToken(req, next);
          } else {
            return this.expireAndRedirect(error);
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  /**Clears user data and redirects to the login screen.*/
  private expireAndRedirect(error): Observable<HttpEvent<any>> {
    this.auth.expire();
    this.router.navigateByUrl("login");
    return throwError(error);
  }

  /**Adds a new authorization header to a request defined by a token string*/
  private addAuthorizationHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return request;
  }

  /**Refreshes the access token and retrys all failed requests due to authorization error */
  private refreshToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.accessTokenStream.next(null);

      return this.auth.refreshToken().pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          this.accessTokenStream.next(token.access_token);
          // repeat failed request with new token
          return next.handle(
            this.addAuthorizationHeader(request, token.access_token)
          );
        }),
        catchError(this.expireAndRedirect)
      );
    } else {
      // wait while getting new token
      return this.accessTokenStream.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, token));
        })
      );
    }
  }
}

/**Provider for the RequestErrorInterceptor to be provide in the root module */
export const RequestErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RequestErrorInterceptor,
  multi: true,
};
