import { Injectable } from "@angular/core";
import { Document } from "src/app/interfaces/document";
import { Metadata } from "src/app/interfaces/metadata";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DocumentsService {
  constructor() {}

  private MOCK: Metadata[] = [
    {
      id: 1234,
      title: "A case study",
      description: "string",
      published: true,
      incidentDate: new Date(2012, 4),
      creationDate: new Date(2012, 12)
    },
    {
      id: 4321,
      title: "Another case study",
      description: "string",
      published: true,
      incidentDate: new Date(2010, 9),
      creationDate: new Date(2012, 7)
    },
    {
      id: 1234,
      title: "A case study",
      description: "string",
      published: true,
      incidentDate: new Date(2012, 4),
      creationDate: new Date(2012, 12)
    }
  ];

  public getDocuments(): Observable<Metadata[]> {
    return of(this.MOCK);
  }
}
