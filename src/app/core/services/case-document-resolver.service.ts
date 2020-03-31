import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { CaseDocument } from "@app/models/case-document";
import { DocumentsService } from "@app/core/services/documents.service";
import { DocumentEditionService } from "./document-edition.service";

@Injectable({
  providedIn: "root"
})
export class CaseDocumentResolverService implements Resolve<CaseDocument> {
  constructor(
    private docService: DocumentsService,
    private editService: DocumentEditionService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CaseDocument> | Observable<never> {
    let id = route.paramMap.get("docid");

    return this.docService.getDocumentById(id).pipe(
      take(1),
      mergeMap(caseDoc => {
        console.log(caseDoc);
        if (caseDoc) {
          this.editService.setActiveCaseDocument(caseDoc);
          return of(caseDoc);
        } else {
          // id not found
          console.log("document not found");
          this.router.navigate(["/invalid"]);
          return EMPTY;
        }
      })
    );
  }
}
