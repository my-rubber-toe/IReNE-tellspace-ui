import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { CaseDocument } from "@app/models/case-document";
import { DocumentsService } from "./documents.service";
import { ContentSection } from "@app/models/content-section";
import { Timeline } from "@app/models/timeline";
import { Actor } from "@app/models/actor";
import { Author } from "@app/models/author";
import { debounceTime } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DocumentEditionService {
  constructor(private docService: DocumentsService) {}

  /**Caches the active Case Document for use of the editors */
  private activeCaseDocument: CaseDocument;

  /**Stream source to track changes on the active case document */
  private caseDocumentSource = new BehaviorSubject<CaseDocument>(
    new CaseDocument()
  );

  /**Stream of the active case document*/
  private documentStream$ = this.caseDocumentSource.asObservable();

  private isSaved = new BehaviorSubject<boolean>(true);

  private isSavedStream$ = this.isSaved.asObservable();

  /**Gets an observable reference to the active document stream */
  public getDocumentStream(): Observable<CaseDocument> {
    return this.documentStream$;
  }

  /**Sets the active case document opened for edition. Updates the stream with the new data */
  public setActiveCaseDocument(caseDocument: CaseDocument) {
    this.activeCaseDocument = caseDocument;
    this.updateSource();
  }

  /**Updates the active case document stream source with the current state of the activeCaseDocument instance*/
  private updateSource() {
    this.caseDocumentSource.next(this.activeCaseDocument);
  }

  /**Changes the active document title to the given string and updates the backend*/
  public editDocumentTitle(newTitle: string) {
    this.activeCaseDocument.title = newTitle;
    this.updateSource();
    this.docService
      .edit(this.activeCaseDocument.id, "title", { title: newTitle })
      .subscribe((_) => {
        alert("Title Saved");
      });
  }

  /**Changes the active document description to the given string and updates the backend*/
  public editDescription(descriptionText: string) {
    this.activeCaseDocument.description = descriptionText;
    this.docService
      .edit(this.activeCaseDocument.id, "description", {
        description: descriptionText,
      })
      .subscribe((_) => {
        this.updateSource();
      });
  }

  /**Changes the active document timeline to the given timeline array and updates the backend*/
  public editTimeline(newTimeline: any) {
    this.activeCaseDocument.timeline = newTimeline.timeline;
    this.docService
      .edit(this.activeCaseDocument.id, "timeline", newTimeline)
      .subscribe((_) => {
        this.updateSource();
      });
  }

  /**Changes the active document infraestructure types to the given string array and updates the backend*/
  public editInfraestructureTypes(infrastructureTypes: string[]) {
    this.activeCaseDocument.infrastructure_type = infrastructureTypes;
    this.docService
      .edit(this.activeCaseDocument.id, "infrastructure_types", {
        infrastructure_type: infrastructureTypes,
      })
      .subscribe((_) => {
        this.updateSource();
      });
  }

  /**Changes the active document damage types to the given string array and updates the backend*/
  public editDamageTypes(damageTypes: string[]) {
    this.activeCaseDocument.damage_type = damageTypes;
    this.docService
      .edit(this.activeCaseDocument.id, "damage_types", {
        damage_type: damageTypes,
      })
      .subscribe((_) => {
        this.updateSource();
      });
  }

  /**Changes the active document actors to the given Actor array and updates the backend*/
  public editActors(actors: any) {
    this.activeCaseDocument.actors = actors.actors;
    this.docService
      .edit(this.activeCaseDocument.id, "actors", actors)
      .subscribe((_) => {
        this.updateSource();
      });
  }

  /**Changes the active document authors to the given Actor array and updates the backend*/
  public editAuthors(authors: any) {
    this.activeCaseDocument.authors = authors.authors;
    this.docService
      .edit(this.activeCaseDocument.id, "authors", authors)
      .subscribe((_) => {
        this.updateSource();
      });
  }

  /**Changes the active document locations to the given string array and updates the backend*/
  public editLocations(locations: string[]) {
    this.activeCaseDocument.location = locations;
    this.docService
      .edit(this.activeCaseDocument.id, "locations", { location: locations })
      .subscribe((_) => {
        this.updateSource();
      });
  }

  /**Changes the active document tags to the given string array and updates the backend*/
  public editTags(tags: string[]) {
    this.activeCaseDocument.tags = tags;
    this.docService
      .edit(this.activeCaseDocument.id, "tags", { tags: tags })
      .subscribe((_) => {
        this.updateSource();
      });
  }

  /**Change the active document incident date to the given date and updates the backend*/
  public editIncidentDate(incidentDay: Date) {
    this.activeCaseDocument.incident_date = incidentDay;
    //TODO connect to endpoint
  }

  public getSaveStatus(): Observable<boolean> {
    return this.isSavedStream$;
  }

  public editSection(sec: ContentSection) {
    this.isSaved.next(false);
    this.activeCaseDocument.section[sec.section_nbr] = sec;
    this.updateSource();
    this.docService
      .editDocumentSection(this.activeCaseDocument.id, sec)
      .subscribe((next) => {
        this.isSaved.next(true);
      });
  }

  public createSection() {
    console.log("this.createSection executed");
    this.docService.createSection(this.activeCaseDocument.id).subscribe((x) => {
      this.activeCaseDocument.section.push(
        new ContentSection(
          this.activeCaseDocument.section.length,
          "Create Section Works"
        )
      );
      this.updateSource();
    });
  }

  public removeSection(sectionPosition: number) {
    this.docService
      .removeSection(this.activeCaseDocument.id, sectionPosition)
      .subscribe((x) => {
        this.activeCaseDocument.section.splice(sectionPosition, 1);
        this.updateSource();
      });
  }

  public getActiveSection(sectionPosition: number): ContentSection {
    if (sectionPosition < this.activeCaseDocument.section.length) {
      return this.activeCaseDocument.section[sectionPosition];
    }
    return null;
  }
}
