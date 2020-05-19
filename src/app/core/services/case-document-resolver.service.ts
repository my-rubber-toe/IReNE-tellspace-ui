/**Case Document Resolver Service that loads the content of a specific case study into the case study edition service
 * @author Alberto Canela (alberto.canela@upr.edu)
 */

import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
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
    route: ActivatedRouteSnapshot
  ): Observable<CaseDocument> | Observable<never> {
    let id = route.paramMap.get("docid");
    Swal.fire(`Loading Case Document\n Please wait`);
    Swal.showLoading();
    return this.docService.getDocumentById(id).pipe(
      take(1),
      mergeMap((caseDoc) => {
        if (caseDoc) {
          caseDoc.document.id = id;
          let parsedDoc = this.parseCaseDocument(caseDoc);
          this.editService.setActiveCaseDocument(parsedDoc);
          Swal.close();
          return of(parsedDoc);
        } else {
          // id not found
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
    Object.assign(caseDocument, response.document);
    if (caseDocument.timeline) {
      caseDocument.timeline = response.document.timeline.map((timeEvent) => {
        return {
          event: timeEvent.event,
          eventStartDate: this.parseDateString(timeEvent.eventStartDate),
          eventEndDate: this.parseDateString(timeEvent.eventEndDate),
        };
      });
    } else {
      caseDocument.timeline = [];
    }
    caseDocument.incidentDate = this.parseDateString(
      response.document.incidentDate
    );
    caseDocument.lastModificationDate = this.parseDateString(
      response.document.lastModificationDate
    );
    caseDocument.creationDate = this.parseDateString(
      response.document.lastModificationDate
    );
    caseDocument.docsize = response.document_size;
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
