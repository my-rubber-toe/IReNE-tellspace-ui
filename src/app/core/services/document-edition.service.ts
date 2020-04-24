import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject, of } from "rxjs";
import { CaseDocument } from "@app/shared/models/case-document";
import { DocumentsService } from "./documents.service";
import { ContentSection } from "@app/shared/models/content-section";
import { Timeline } from "@app/shared/models/timeline";
import { Actor } from "@app/shared/models/actor";
import { Author } from "@app/shared/models/author";
import { debounceTime } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class DocumentEditionService {
  constructor(
    private docService: DocumentsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  /**Caches the active Case Document for use of the editors */
  private activeCaseDocument: CaseDocument;

  /**Stream source to track changes on the active case document */
  private caseDocumentSource = new BehaviorSubject<CaseDocument>(
    new CaseDocument()
  );

  /**Stream of the active case document*/
  private documentStream$ = this.caseDocumentSource.asObservable();

  /**Gets an observable reference to the active document stream */
  public getDocumentStream(): Observable<CaseDocument> {
    return this.documentStream$;
  }

  /**Sets the active case document opened for edition. Updates the stream with the new data */
  public setActiveCaseDocument(caseDocument: CaseDocument) {
    this.activeCaseDocument = caseDocument;
    this.updateSource();
  }

  public getActiveDocumentID(): string {
    return this.activeCaseDocument.id;
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
      .subscribe((result) => this.snackBar.open("Title Saved"));
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
        this.snackBar.open("Description Saved");
      });
  }

  /**Changes the active document timeline to the given timeline array and updates the backend*/
  public editTimeline(newTimeline: Timeline[]) {
    this.activeCaseDocument.timeline = newTimeline;
    let timelineArray = newTimeline.map((timeEvent) => {
      return {
        event: timeEvent.event,
        event_start_date: this.datePipe.transform(
          timeEvent.eventStartDate,
          "yyyy-MM-dd"
        ),
        event_end_date: this.datePipe.transform(
          timeEvent.eventEndDate,
          "yyyy-MM-dd"
        ),
      };
    });
    this.docService
      .edit(this.activeCaseDocument.id, "timeline", {timeline: timelineArray})
      .subscribe((_) => {
        this.updateSource();
        this.snackBar.open("Timeline Saved");
      });
  }

  /**Changes the active document infraestructure types to the given string array and updates the backend*/
  public editInfraestructureTypes(infrastructureTypes: string[]) {
    this.activeCaseDocument.infrasDocList = infrastructureTypes;
    this.docService
      .edit(this.activeCaseDocument.id, "infrastructure_types", {
        infrastructure_type: infrastructureTypes,
      })
      .subscribe((_) => {
        this.updateSource();
        this.snackBar.open("Infrastructure Types Saved");
      });
  }

  /**Changes the active document damage types to the given string array and updates the backend*/
  public editDamageTypes(damageTypes: string[]) {
    this.activeCaseDocument.damageDocList = damageTypes;
    this.docService
      .edit(this.activeCaseDocument.id, "damage_types", {
        damage_type: damageTypes,
      })
      .subscribe((_) => {
        this.updateSource();
        this.snackBar.open("Damage Types Saved");
      });
  }

  /**Changes the active document actors to the given Actor array and updates the backend*/
  public editActors(actors: any) {
    this.activeCaseDocument.actors = actors.actors;
    this.docService
      .edit(this.activeCaseDocument.id, "actors", actors)
      .subscribe((_) => {
        this.updateSource();
        this.snackBar.open("Actors Saved");
      });
  }

  /**Changes the active document authors to the given Actor array and updates the backend*/
  public editAuthors(authors: any) {
    this.activeCaseDocument.authors = authors.authors;
    this.docService
      .edit(this.activeCaseDocument.id, "authors", authors)
      .subscribe((_) => {
        this.updateSource();
        this.snackBar.open("Authors Saved");
      });
  }

  /**Changes the active document locations to the given string array and updates the backend*/
  public editLocations(locals: string[]) {
    this.activeCaseDocument.location = locals;
    this.docService
      .edit(this.activeCaseDocument.id, "locations", { locations: locals })
      .subscribe((_) => {
        this.updateSource();
        this.snackBar.open("Locations Saved");
      });
  }

  /**Changes the active document tags to the given string array and updates the backend*/
  public editTags(tags: string[]) {
    this.activeCaseDocument.tags = tags;
    this.docService
      .edit(this.activeCaseDocument.id, "tags", { tags: tags })
      .subscribe((_) => {
        this.updateSource();
        this.snackBar.open("Tags Saved");
      });
  }

  /**Change the active document incident date to the given date and updates the backend*/
  public editIncidentDate(incidentDay: Date) {
    let incidentDayString = this.datePipe.transform(incidentDay, "yyyy-MM-dd");
    this.activeCaseDocument.incidentDate = incidentDay;
    console.log("saved incident date string: ", incidentDayString, incidentDay);
    this.docService
      .edit(this.activeCaseDocument.id, "incident_date", {
        incident_date: incidentDayString,
      })
      .subscribe((_) => {
        this.updateSource();
        this.snackBar.open("Incident Date Saved");
      });
  }

  public editSection(sec: ContentSection, position: number): Observable<any> {
    this.activeCaseDocument.section[position-1] = sec;
    this.updateSource();
    return this.docService.editDocumentSection(
      this.activeCaseDocument.id,
      sec,
      position
    );
  }

  public createSection() {
    console.log("this.createSection executed");
    this.docService.createSection(this.activeCaseDocument.id).subscribe((x) => {
      this.activeCaseDocument.section.push(
        new ContentSection("Untitled Section", "")
      );
      this.updateSource();
    });
  }

  public removeSection(sectionPosition: number) {
    this.docService
      .removeSection(this.activeCaseDocument.id, sectionPosition)
      .subscribe((x) => {
        this.activeCaseDocument.section.splice(sectionPosition-1, 1);
        this.updateSource();
      });
  }

  public getActiveSection(sectionPosition: number): ContentSection {
    if (sectionPosition > 0 && sectionPosition <= this.activeCaseDocument.section.length) {
      return this.activeCaseDocument.section[sectionPosition-1];
    }
    return null;
  }
}
