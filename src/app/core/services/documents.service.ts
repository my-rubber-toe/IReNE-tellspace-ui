import { Injectable } from "@angular/core";
import { Document } from "src/app/interfaces/document";
import { Metadata } from "src/app/interfaces/metadata";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Observable, of } from "rxjs";
import { Author } from "src/app/interfaces/author";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { ContentSection } from "src/app/interfaces/content-section";

@Injectable({
  providedIn: "root"
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  private documentsUrl = "api/tellspace/documents"; // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  /** GET document metadata. Will 404 if there are no documents */
  public getDocuments(): Observable<Document[]> {
    return this.http
      .get<Document[]>(this.documentsUrl)
      .pipe(catchError(this.handleError<Document[]>("getDocuments", [])));
  }

  /** POST new document on the server */
  public createDocument(newDoc: Document): Observable<any> {
    const url = `${this.documentsUrl}/create`;
    return this.http
      .post(url, newDoc, this.httpOptions)
      .pipe(catchError(this.handleError<any>("createDocument")));
  }

  /** GET document by id. Will 404 if id not found */
  public getDocumentById(id: string): Observable<Document> {
    const url = `${this.documentsUrl}/${id}`;
    return this.http.get<Document>(url).pipe(
      tap(_ => console.log(`getDocumentByID id=${id}`)),
      catchError(this.handleError<Document>(`getDocumentById id=${id}`))
    );
  }

  /** POST new section */
  public createSection(): Observable<any> {
    const url = `${this.documentsUrl}/edit/section/create`;
    return this.http
      .post(url, {}, this.httpOptions)
      .pipe(catchError(this.handleError<any>("createSection")));
  }

  /** POST remove a section */
  public removeSection(sec: ContentSection): Observable<any> {
    const url = `${this.documentsUrl}/edit/section/remove`;
    return this.http
      .post(url, sec, this.httpOptions)
      .pipe(catchError(this.handleError<any>("deleteSection")));
  }

  /** PUT: update the document section on the server */
  public editDocumentSection(sec: ContentSection): Observable<any> {
    const url = `${this.documentsUrl}/edit/section`;
    return this.http.put(url, sec, this.httpOptions).pipe(
      tap(_ => console.log(`edited section title=${sec.section_title}`)),
      catchError(
        this.handleError<any>(`editDocumentSection title=${sec.section_title}`)
      )
    );
  }

  /** PUT: edit document metadata on the server
   * @argument type document field to edit on the server.
   */
  public edit(type: string, body: any): Observable<any> {
    const url = `${this.documentsUrl}/edit/${type}`;
    return this.http.put(url, body, this.httpOptions).pipe(
      tap(_ => console.log(`edit type=${type}`)),
      catchError(this.handleError<any>(`edit type=${type}`))
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
