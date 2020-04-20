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
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { ContentSection } from "@app/shared/models/content-section";
import { CaseDocumentResponse } from "@app/shared/models/case-document-response";
import { Actor } from "@app/shared/models/actor";
import { Author } from "@app/shared/models/author";
import { CaseDocumentCreateRequest } from "@app/shared/models/case-document-create-request";
import { CaseDocumentMetadata } from "@app/shared/models/case-document-metadata";
// import { Metadata } from "src/app/interfaces/metadata";

// array in local storage for mockCaseStudies
let CASES = (JSON.parse(localStorage.getItem("cases")) ||
  []) as CaseDocumentResponse[];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  /**Mock intercept routes and simulate server logic */
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
        case url.endsWith("/logout"):
          return logout();
        case url.match(/\/auth\/\w/) && method === "GET":
          return login();
        case url.endsWith("/edit/section/create") && method === "POST":
          return createSection();
        case url.match(/\/edit\/section\/remove\/\w/) && method === "DELETE":
          return removeSection();
        case url.match(/\/edit\/section\/\w/) && method === "PUT":
          return editDocumentSection();
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
        case url.endsWith("/edit/infrastructure_types") && method === "PUT":
          return edit("DocumentInsfraestructureTypes");
        case url.endsWith("/edit/damage_types") && method === "PUT":
          return edit("DocumentDamageTypes");
        case url.endsWith("/edit/incident_date") && method === "PUT":
          return edit("DocumentIncidentDate");
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
    function login() {
      let expireBy = new Date();
      expireBy.setTime(expireBy.getTime() + 60 * 60000); //1 hour
      let refreshBy = new Date();
      refreshBy.setDate(refreshBy.getDate() + 1); //1 day
      return ok({
        access_token: "fake-jwt-token",
        refresh_token: "fake-jwt-token",
        access_expiration: expireBy,
        refresh_expiration: refreshBy,
      });
    }

    function logout() {
      return ok({ message: "Successfully logged out." });
    }

    function getDocuments() {
      let response: CaseDocumentMetadata[] = CASES.map((doc) => {
        return {
          id: doc.id,
          title: doc.title,
          description: doc.description,
          published: doc.published,
          incidentDate: doc.incidentDate,
          creationDate: doc.creationDate,
          lastModificationDate: doc.lastModificationDate,
        };
      });

      //   if (!isLoggedIn()) return unauthorized();
      return ok(response);
    }

    function createDocument() {
      const req = body as CaseDocumentCreateRequest;
      let newDocument: CaseDocumentResponse = new CaseDocumentResponse();
      newDocument.title = req.title;
      newDocument.actors = req.actors.map((x) => x as Actor);
      newDocument.authors = req.authors.map((x) => x as Author);
      //set id for the document simulating mongo standard
      newDocument.id = generateMongoObjectId();
      newDocument.creationDate = getNowString();
      newDocument.lastModificationDate = getNowString();
      newDocument.incidentDate = req.incident_date;
      newDocument.description = "";
      newDocument.damageDocList = req.damage_type;
      newDocument.infrasDocList = req.infrastructure_type;
      newDocument.section = [
        new ContentSection("Abstract", ""),
        new ContentSection("Introduction", ""),
        new ContentSection("Body", ""),
      ];
      newDocument.language = req.language;
      newDocument.tags = ["Hurricane"];
      newDocument.location = ["San Juan, PR"];
      newDocument.timeline = [];
      newDocument.published = true;
      CASES.push(newDocument);
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function getDocumentById() {
      //   if (!isLoggedIn()) return unauthorized();
      console.log("the backend id " + idFromUrl(1));
      const doc: CaseDocumentResponse = CASES.find(
        (x) => x.id === idFromUrl(1)
      );
      console.log(doc);
      let copyDoc = Object.assign(new CaseDocumentResponse(), doc);
      copyDoc.section = doc.section.map((x) => Object.assign({}, x));
      copyDoc.authors = doc.authors.map((x) => Object.assign({}, x));
      copyDoc.actors = doc.actors.map((x) => Object.assign({}, x));
      // copyDoc.timeline = doc.timeline.map(x => Object.assign({}, x));
      return ok(copyDoc);
    }

    function removeDocument() {
      //   if (!isLoggedIn()) return unauthorized();
      let doc = CASES.find((x: CaseDocumentResponse) => x.id == idFromUrl(1));
      let size = CASES.length;
      if (doc) {
        CASES.splice(CASES.indexOf(doc), 1);
        console.log("Removing in backend");
        localStorage.setItem("cases", JSON.stringify(CASES));
      } else return error({ error: "Document not found" });
      return ok();
    }

    function createSection() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc = CASES.find(
        (x: CaseDocumentResponse) => x.id === idFromUrl(4)
      );
      console.log("created on backend");
      doc.section.push(new ContentSection("", ""));
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function removeSection() {
      //   if (!isLoggedIn()) return unauthorized();
      const doc: CaseDocumentResponse = CASES.find(
        (x: CaseDocumentResponse) => x.id === idFromUrl(5)
      );
      const index = +idFromUrl(1);
      if (index >= doc.section.length) {
        return error("Invalid index");
      }
      doc.section.splice(index, 1);
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok(doc);
    }

    function editDocumentSection() {
      //   if (!isLoggedIn()) return unauthorized();

      const doc: CaseDocumentResponse = CASES.find(
        (x: CaseDocumentResponse) => x.id === idFromUrl(4)
      );
      const sec: ContentSection = doc.section[+idFromUrl(1)];
      sec.section_title = body.section_title;
      sec.section_text = body.section_text;
      console.log(sec);
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function edit(type: string) {
      //   if (!isLoggedIn()) return unauthorized();
      const doc: CaseDocumentResponse = CASES.find(
        (x: CaseDocumentResponse) => x.id === idFromUrl(3)
      );
      switch (type) {
        case "DocumentTitle":
          doc.title = body.title;
          break;
        case "DocumentDescription":
          doc.description = body.description;
          break;
        case "DocumentTimeline":
          doc.timeline = body.timeline;
          break;
        case "DocumentInsfraestructureTypes":
          doc.infrasDocList = body.infrastructure_type;
          break;
        case "DocumentDamageTypes":
          doc.damageDocList = body.damage_type;
          break;
        case "DocumentActors":
          doc.actors = body.actors;
          break;
        case "DocumentLocations":
          doc.location = body.location;
          break;
        case "DocumentAuthors":
          doc.authors = body.authors;
          break;
        case "DocumentTags":
          doc.tagsDoc = body.tagsDoc;
          break;
        case "DocumentIncidentDate":
          doc.incidentDate = body.incident_date;
          break;
      }
      const now = new Date();
      doc.lastModificationDate = getNowString();
      localStorage.setItem("cases", JSON.stringify(CASES));
      return ok();
    }

    function getMockDamageTypes() {
      console.log("Howdy from damage types");
      return ok({
        type: Object,
        categories: ["Earthquake", "Hurricane", "Flood", "Erosion", "Tornado"],
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
          "Construction",
        ],
      });
    }

    //System Functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorized" } });
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
          .replace(/[x]/g, function () {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase()
      );
    }

    function getNowString(): string {
      const now = new Date();
      return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
