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
import { CaseDocument } from "@app/models/case-document";
import { CaseDocumentCreateRequest } from "@app/models/case-document-create-request";
import { Actor } from "@app/models/actor";
import { Author } from "@app/models/author";
// import { Metadata } from "src/app/interfaces/metadata";

// array in local storage for mockCaseStudies
let CASES = (JSON.parse(localStorage.getItem("cases")) || []) as CaseDocument[];

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
        case url.endsWith("/edit/infrastructure_types") && method === "PUT":
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
      return ok(JSON.stringify(CASES));
    }

    function createDocument() {
      console.log("creating document", body);
      let newDocument: CaseDocument = Object.assign(new CaseDocument(), body);
      newDocument.actors = body.actors.map(x => x as Actor);
      newDocument.authors = body.authors.map(x => x as Author);
      //set id for the document simulating mongo standard
      newDocument.id = generateMongoObjectId();
      newDocument.creationDate = new Date();
      newDocument.description = " Hola soy el server ...";
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
      console.log("the backend id " + idFromUrl(1));
      const doc: CaseDocument = CASES.find(x => x.id === idFromUrl(1));
      console.log(doc);
      return ok(Object.assign(new CaseDocument(), doc));
    }

    function removeDocument() {
      //   if (!isLoggedIn()) return unauthorized();
      let doc = CASES.find((x: CaseDocument) => x.id == idFromUrl(1));
      let size = CASES.length;
      if (doc && size > 0) {
        doc = CASES[size - 1];
        console.log("Removing in backend");
        console.log(CASES.pop());
        localStorage.setItem("cases", JSON.stringify(CASES));
      } else return error({ error: "Document not found" });
      return ok();
    }

    function createSection() {
      //   if (!isLoggedIn()) return unauthorized();
      //const doc = CASES.find((x: CaseDocument) => x.id === idFromUrl(4));
      console.log("created on backend");
      // doc.section.push(new ContentSection(doc.section.length, "Server Title"));
      //localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function removeSection() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc: CaseDocument = CASES.find(
        (x: CaseDocument) => x.id === idFromUrl(4)
      );
      const sec: ContentSection = doc.section[body.section_nbr];
      sec.section_nbr = doc.section.length - 1;
      sec.section_title = doc.section[doc.section.length - 1].section_title;
      sec.section_text = doc.section[doc.section.length - 1].section_text;
      doc.section.pop();
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok(doc);
    }

    function editDocumentSection() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc: CaseDocument = CASES.find(
        (x: CaseDocument) => x.id === idFromUrl(4)
      );
      const sec: ContentSection = doc.section[body.section_nbr];
      sec.section_title = body.sectio_title;
      sec.section_text = body.section_text;
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function edit(type: string) {
      //   if (!isLoggedIn()) return unauthorized();
      const doc: CaseDocument = CASES.find(
        (x: CaseDocument) => x.id === idFromUrl(3)
      );
      switch (type) {
        case "editDocumentTitle":
          doc.title = body.title;
        case "editDocumentDescription":
          doc.description = body.description;
        case "editDocumentTimeline":
          doc.timeline = body.timeline;
        case "editDocumentInsfraestructureTypes":
          doc.infrastructure_type = body.infrastructure_type;
        case "editDocumentDamageTypes":
          doc.damage_type = body.damage_type;
        case "editDocumentActors":
          doc.actors = body.actors;
        case "editDocumentLocations":
          doc.location = body.location;
        case "editDocumentAuthors":
          doc.authors = body.authors;
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

    /**Returns string from the url coresponding to index position right to left, where index 1 returns the last string on the url. */
    function idFromUrl(index: number): string {
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
