import { Injectable } from "@angular/core";
import { CaseDocument } from "@app/models/case-document";
import { Observable, of, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { ContentSection } from "@app/models/content-section";
import { Category } from "@app/models/category";
import { CaseDocumentCreateRequest } from "@app/models/case-document-create-request";

@Injectable({
  providedIn: "root",
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  private rootUrl = "api"; // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  //Route Client Functions:

  /** GET document metadata. Will 404 if there are no documents */
  public getDocuments(): Observable<string> {
    const url = `${this.rootUrl}/documents`;
    return this.http
      .get<string>(url, this.httpOptions)
      .pipe(catchError(this.handleError<string>("getDocuments")));
  }

  /** POST new document on the server */
  public createDocument(req: CaseDocumentCreateRequest): Observable<any> {
    console.log("sending create");
    const url = `${this.rootUrl}/documents/create`;
    return this.http
      .post(url, req, this.httpOptions)
      .pipe(catchError(this.handleError<any>("createDocument")));
  }

  /** DELETE document on the server */
  public removeDocument(docid: string): Observable<any> {
    const url = `${this.rootUrl}/documents/remove/${docid}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap((_) => console.log(`removeDocument id=${docid}`)),
      catchError(this.handleError<any>(`remove document docid=${docid}`))
    );
  }

  /** GET document by id. Will 404 if id not found */
  public getDocumentById(docid: string): Observable<CaseDocument> {
    const url = `${this.rootUrl}/documents/${docid}`;
    return this.http.get<CaseDocument>(url).pipe(
      tap((_) => console.log(`getDocumentByID id=${docid}`)),
      catchError(
        this.handleError<CaseDocument>(`getDocumentById docid=${docid}`)
      )
    );
  }

  /** POST new section */
  public createSection(docid: string): Observable<any> {
    const url = `${this.rootUrl}/documents/${docid}/edit/section/create`;
    return this.http.post(url, {}, this.httpOptions).pipe(
      tap((_) => console.log(`createSection docid=${docid}`)),
      catchError(this.handleError<any>("createSection"))
    );
  }

  /** POST remove a section */
  public removeSection(docid: string, secid: number): Observable<any> {
    const url = `${this.rootUrl}/documents/${docid}/edit/section/remove/${secid}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap((_) => console.log(`createSection secid=${secid} docid=${docid}`)),
      catchError(this.handleError<any>("deleteSection"))
    );
  }

  /** PUT: update the document section on the server */
  public editDocumentSection(
    docid: string,
    sec: ContentSection,
    pos: number
  ): Observable<any> {
    const url = `${this.rootUrl}/documents/${docid}/edit/section/${pos}`;
    console.log(sec);
    return this.http.put(url, sec, this.httpOptions).pipe(
      tap((_) => console.log(`edited section title=${sec.section_title}`)),
      catchError(
        this.handleError<any>(`editDocumentSection title=${sec.section_title}`)
      )
    );
  }

  /** PUT: edit document metadata on the server
   * @argument type document field to edit on the server.
   */
  public edit(docid: string, type: string, body: any): Observable<any> {
    const url = `${this.rootUrl}/documents/${docid}/edit/${type}`;
    return this.http.put(url, body, this.httpOptions).pipe(
      tap((_) => console.log(`edit type=${type}`)),
      catchError(this.handleError<any>(`edit type=${type}`))
    );
  }

  /** GET infraestructure types defined on server */
  public getInfrastructureTypes(): Observable<string[]> {
    const url = `${this.rootUrl}/general/infrastructure_types`;
    return this.http.get<Category>(url).pipe(
      catchError(
        this.handleError<Category>("getInfrastructureTypes", {
          categories: [""],
        })
      ),
      map((cat: Category) => {
        return cat.categories;
      })
    );
  }

  /** GET damage types defined on server */
  public getDamageTypes(): Observable<string[]> {
    const url = `${this.rootUrl}/general/damage_types`;
    return this.http.get<Category>(url, this.httpOptions).pipe(
      catchError(
        this.handleError<Category>("getDamageTypes", { categories: [""] })
      ),
      map((cat: Category) => {
        return cat.categories;
      })
    );
  }

  /** GET tags defined on server */
  public getTags(): Observable<string[]> {
    const url = `${this.rootUrl}/general/tags`;
    return this.http.get<Category>(url, this.httpOptions).pipe(
      catchError(
        this.handleError<Category>("getTags", { categories: [""] })
      ),
      map((cat: Category) => {
        return cat.categories;
      })
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
