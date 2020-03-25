import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { Document } from "@app/models/Document";
import { DocumentsService } from "@app/core/services/documents.service";

@Injectable({
  providedIn: "root"
})
export class CaseDocumentResolverService implements Resolve<Document> {
  constructor(private docService: DocumentsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Document> | Observable<never> {
    let id = route.paramMap.get("docid");

    return this.docService.getDocumentById(id).pipe(
      take(1),
      mergeMap(caseDoc => {
        console.log(caseDoc);
        if (caseDoc) {
          return of(caseDoc);
        } else {
          // id not found
          this.router.navigate(["/invalid"]);
          return EMPTY;
        }
      })
    );
  }
}
