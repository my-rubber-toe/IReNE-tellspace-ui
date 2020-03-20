/**
 * TellSpace Mock Backend HTTPS Interceptor to simulate backend calls
 * Modified from the code provided by Jason Watmore on his tutorial (2019)
 * @packageDocumentation
 */

import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

// array in local storage for registered users
// let users = JSON.parse(localStorage.getItem("users")) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/api/documents/") && method === "GET":
          return getDocuments();
        case url.endsWith("/api/documents/create") && method === "POST":
          return createDocument();
        case url.match(/\/documents\/\w/) && method === "GET":
          return getDocumentById();
        case url.endsWith("/edit/title") && method === "PUT":
          return editDocumentTitle();
        case url.endsWith("/edit/description") && method === "PUT":
          return editDocumentDescription();
        case url.endsWith("/edit/timeline") && method === "PUT":
          return editDocumentTimeline();
        case url.endsWith("/edit/section") && method === "PUT":
          return editDocumentSection();
        case url.endsWith("/edit/infraestructure_types") && method === "PUT":
          return editDocumentInsfraestructureTypes();
        case url.endsWith("/edit/damage_types") && method === "PUT":
          return editDocumentDamageTypes();
        case url.endsWith("/edit/actors") && method === "PUT":
          return editDocumentActors();
        case url.endsWith("/edit/locations") && method === "PUT":
          return editDocumentLocations();
        case url.endsWith("/edit/authors") && method === "PUT":
          return editDocumentAuthors();
        case url.endsWith("/edit/tags") && method === "PUT":
          return editDocumentTags();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function getDocuments() {
      return ok();
    }

    function createDocument() {
      return ok();
    }

    function getDocumentById() {
      return ok();
    }

    function editDocumentTitle() {
      return ok();
    }

    function editDocumentDescription() {
      return ok();
    }

    function editDocumentTimeline() {
      return ok();
    }

    function editDocumentSection() {
      return ok();
    }

    function editDocumentInsfraestructureTypes() {
      return ok();
    }

    function editDocumentDamageTypes() {
      return ok();
    }

    function editDocumentActors() {
      return ok();
    }

    function editDocumentLocations() {
      return ok();
    }

    function editDocumentAuthors() {
      return ok();
    }

    function editDocumentTags() {
      return ok();
    }

    // function register() {
    //   const user = body;

    //   if (users.find(x => x.username === user.username)) {
    //     return error('Username "' + user.username + '" is already taken');
    //   }

    //   user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    //   users.push(user);
    //   localStorage.setItem("users", JSON.stringify(users));

    //   return ok();
    // }

    // function authenticate() {
    //   const { username, password } = body;
    //   const user = users.find(
    //     x => x.username === username && x.password === password
    //   );
    //   if (!user) return error("Username or password is incorrect");
    //   return ok({
    //     id: user.id,
    //     username: user.username,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     token: "fake-jwt-token"
    //   });
    // }

    // function getUsers() {
    //   if (!isLoggedIn()) return unauthorized();
    //   return ok(users);
    // }

    // function getUserById() {
    //   if (!isLoggedIn()) return unauthorized();

    //   const user = users.find(x => x.id == idFromUrl());
    //   return ok(user);
    // }

    // function deleteUser() {
    //   if (!isLoggedIn()) return unauthorized();

    //   users = users.filter(x => x.id !== idFromUrl());
    //   localStorage.setItem("users", JSON.stringify(users));
    //   return ok();
    // }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 3]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
