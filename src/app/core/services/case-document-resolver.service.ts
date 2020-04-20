import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { CaseDocument } from "@app/shared/models/case-document";
import { CaseDocumentResponse } from "@app/shared/models/case-document-response";
import { DocumentsService } from "@app/core/services/documents.service";
import { DocumentEditionService } from "./document-edition.service";
import Swal from "sweetalert2";

/**Resolver service to load and define case document before loading the document edition module*/
@Injectable({
  providedIn: "root",
})
export class CaseDocumentResolverService implements Resolve<CaseDocument> {
  constructor(
    private docService: DocumentsService,
    private editService: DocumentEditionService,
    private router: Router
  ) {}

  /**Makes a request to the documents service to request the backend for
   * the Case Document data that corresponds to the id passed as parameter on
   * the guarded route. On request success, processes the data and passes it to
   * the document edition service. On failure, logs that the document was not found and
   * redirects the application to the invalid route.
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CaseDocument> | Observable<never> {
    let id = route.paramMap.get("docid");
    Swal.fire(`Loading Case Document\n Please wait`);
    Swal.showLoading();
    return this.docService.getDocumentById(id).pipe(
      take(1),
      mergeMap((caseDoc) => {
        console.log(caseDoc);
        if (caseDoc) {
          caseDoc.id = id;
          let parsedDoc = this.parseCaseDocument(caseDoc);
          this.editService.setActiveCaseDocument(parsedDoc);
          Swal.close();
          return of(parsedDoc);
        } else {
          // id not found
          console.log("document not found");
          this.router.navigate(["/invalid"]);
          Swal.close();
          return EMPTY;
        }
      })
    );
  }

  /**Parse the case document response from the server to a case document object.
   * Transforms date strings on case document to Javascript date objects.
   * @param response Case Document object as received from server.
   */
  private parseCaseDocument(response: CaseDocumentResponse): CaseDocument {
    let caseDocument = new CaseDocument();
    Object.assign(caseDocument, response);
    if (caseDocument.timeline) {
      caseDocument.timeline = response.timeline.map((timeEvent) => {
        return {
          event_description: timeEvent.event_description,
          event_start_date: this.parseDateString(timeEvent.event_start_date),
          event_end_date: this.parseDateString(timeEvent.event_end_date),
        };
      });
    } else {
      caseDocument.timeline = [];
    }
    caseDocument.incidentDate = this.parseDateString(response.incidentDate);
    caseDocument.lastModificationDate = this.parseDateString(
      response.lastModificationDate
    );
    caseDocument.creationDate = this.parseDateString(
      response.lastModificationDate
    );
    return caseDocument;
  }

  /**Returns a date object that stores the date passed as argument.
   * The date returned has added the timezone offset, such that
   * the day number corresponds exactly to the date string provided
   * @param date date to be converted, expected format "YYYY-MM-DD"*/
  private parseDateString(date: string): Date {
    let dateObject = new Date(date);
    dateObject.setMinutes(
      dateObject.getMinutes() + dateObject.getTimezoneOffset()
    );
    return dateObject;
  }
}
