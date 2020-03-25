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
import { ContentSection } from "@app/models/content-section";
import { Document } from "@app/models/document";
// import { Metadata } from "src/app/interfaces/metadata";

// array in local storage for mockCaseStudies
let CASES = JSON.parse(localStorage.getItem("cases")) || [];

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
      console.log("Hi from fake backend");
      switch (true) {
        case url.endsWith("/documents") && method === "GET":
          return getDocuments();
        case url.endsWith("/documents/create") && method === "POST":
          return createDocument();
        case url.match(/\/documents\/\w/) && method === "GET":
          return getDocumentById();
        case url.match(/\/remove\/\w/) && method === "DELETE":
          return removeDocument();
        case url.endsWith("/edit/title") && method === "PUT":
          return edit("DocumentTitle");
        case url.endsWith("/edit/description") && method === "PUT":
          return edit("DocumentDescription");
        case url.endsWith("/edit/timeline") && method === "PUT":
          return edit("DocumentTimeline");
        case url.endsWith("/edit/section") && method === "PUT":
          return editDocumentSection();
        case url.endsWith("/edit/section/create") && method === "POST":
          return createSection();
        case url.endsWith("edit/section/remove") && method === "POST":
          return removeSection();
        case url.endsWith("/edit/infraestructure_types") && method === "PUT":
          return edit("DocumentInsfraestructureTypes");
        case url.endsWith("/edit/damage_types") && method === "PUT":
          return edit("DocumentDamageTypes");
        case url.endsWith("/edit/actors") && method === "PUT":
          return edit("DocumentActors");
        case url.endsWith("/edit/locations") && method === "PUT":
          return edit("DocumentLocations");
        case url.endsWith("/edit/authors") && method === "PUT":
          return edit("DocumentAuthors");
        case url.endsWith("/edit/tags") && method === "PUT":
          return edit("DocumentTags");
        case url.endsWith("/general/infrastructure_types") && method === "GET":
          return getMockInfrastructureTypes();
        case url.endsWith("/general/damage_types") && method === "GET":
          return getMockDamageTypes();
        case url.endsWith("/general/tags") && method === "GET":
          return getMockDamageTypes();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function getDocuments() {
      //   if (!isLoggedIn()) return unauthorized();
      return ok(CASES);
    }

    function createDocument() {
      console.log("creating document");
      const newDocument: Document = Object.assign(new Document(), body);
      //if (CASES.find((x: { title: any }) => x.title === newDocument.title)) {
      //  return error('Title "' + newDocument.title + '" is already taken');
      // }
      //set id for the document simulating mongo standard
      newDocument.id = generateMongoObjectId();
      newDocument.creationDate = new Date();
      newDocument.section = [
        new ContentSection(1, "Abstract"),
        new ContentSection(2, "Introduction"),
        new ContentSection(3, "Body")
      ];
      newDocument.language = "english";
      CASES.push(newDocument);
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function getDocumentById() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc = CASES.find((x: { id: string }) => x.id == idFromUrl(1));
      return ok(doc);
    }

    function removeDocument() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc = CASES.find((x: { id: string }) => x.id == idFromUrl(1));
      console.log("removed in backend");
      return ok();
    }

    function createSection() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc = CASES.find((x: { id: string }) => x.id == idFromUrl(3));
      doc.section.push(new ContentSection(doc.section.size(), "Untitled"));
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok(doc);
    }

    function removeSection() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc = CASES.find((x: { id: string }) => x.id == idFromUrl(3));
      const sec = doc.section.find(x => x.section_nbr == body.section_nbr);
      sec.section_nbr = doc.section.size() - 1;
      sec.section_title = doc.section[doc.section.size() - 1].section_title;
      sec.section_text = doc.section[doc.section.size() - 1].section_text;
      doc.section.pop(doc.section.size() - 1);
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok(doc);
    }

    function editDocumentSection() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc = CASES.find((x: { id: string }) => x.id == idFromUrl(3));
      const sec = doc.section.find(x => x.section_nbr == body.section_nbr);
      sec.section_title = body.sectio_title;
      sec.section_text = body.section_text;
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function edit(type: string) {
      //   if (!isLoggedIn()) return unauthorized();
      const doc = CASES.find((x: { id: string }) => x.id == idFromUrl(3));
      switch (type) {
        case "editDocumentTitle":
          doc.title = body.title;
        case "editDocumentDescription":
          doc.description = body.description;
        case "editDocumentTimeline":
          doc.timeline = body.timeline;
        case "editDocumentInsfraestructureTypes":
          doc.infrasDocList = body.infrasDocList;
        case "editDocumentDamageTypes":
          doc.damageDocList = body.damageDocList;
        case "editDocumentActors":
          doc.infrasDocList = body.infrasDocList;
        case "editDocumentLocations":
          doc.location = body.location;
        case "editDocumentAuthors":
          doc.author = body.author;
        case "editDocumentTags":
          doc.tagsDoc = body.tagsDoc;
      }
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function getMockDamageTypes() {
      console.log("Howdy from damage types");
      return ok({
        type: Object,
        categories: ["Earthquake", "Hurricane", "Flood", "Erosion", "Tornado"]
      });
    }

    function getMockInfrastructureTypes() {
      return ok({
        type: Object,
        categories: [
          "Transportation",
          "Energy",
          "Water",
          "Security",
          "Ports",
          "Structure",
          "Construction"
        ]
      });
    }

    //System Functions

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

    function idFromUrl(index: number) {
      const urlParts = url.split("/");
      return urlParts[urlParts.length - index];
    }

    /**Function to generate object id following mongo db guidelines*/

    function generateMongoObjectId(): string {
      var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
      return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
          .replace(/[x]/g, function() {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase()
      );
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
