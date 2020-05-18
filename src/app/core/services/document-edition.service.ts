import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { CaseDocument } from "@app/shared/models/case-document";
import { DocumentsService } from "./documents.service";
import { ContentSection } from "@app/shared/models/content-section";
import { Timeline } from "@app/shared/models/timeline";
import { Actor } from "@app/shared/models/actor";
import { Author } from "@app/shared/models/author";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DatePipe } from "@angular/common";
import {
  AuthorPutRequest,
  ActorPutRequest,
} from "@app/shared/models/put-request-models";
import { environment } from "environments/environment";
import { tap } from "rxjs/operators";

/**Service that serves as app-wide store for specific case document data and builds the upstream request bodies */
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
  public editDocumentTitle(newTitle: string): Observable<any> {
    return this.docService
      .edit(this.activeCaseDocument.id, "title", { title: newTitle })
      .pipe(
        tap(
          (response) => {
            this.activeCaseDocument.title = newTitle;
            this.activeCaseDocument.docsize = response.doc_size;
            this.updateSource();
            this.snackBar.open("Title Saved");
          },
          (error) => {
            if (error.status == 500)
              this.showError(
                `Case Document ${newTitle} exists on the database, please try another title`
              );
            else this.showError(error.error.message.title);
          }
        )
      );
  }

  /**Changes the active document description to the given string and updates the backend*/
  public editDescription(descriptionText: string) {
    this.docService
      .edit(this.activeCaseDocument.id, "description", {
        description: descriptionText,
      })
      .subscribe(
        (response) => {
          this.activeCaseDocument.description = descriptionText;
          this.activeCaseDocument.docsize = response.doc_size;
          this.updateSource();
          this.snackBar.open("Description Saved");
        },
        (error) => this.showError(error.error.message.description)
      );
  }

  /**Changes the active document timeline to the given timeline array and updates the backend*/
  public editTimeline(newTimeline: Timeline[]) {
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
      .edit(this.activeCaseDocument.id, "timeline", { timeline: timelineArray })
      .subscribe(
        (response) => {
          this.activeCaseDocument.timeline = newTimeline;
          this.activeCaseDocument.docsize = response.doc_size;
          this.updateSource();
          this.snackBar.open("Timeline Saved");
        },
        (error) => this.showError("Timeline Error")
      );
  }

  /**Changes the active document infraestructure types to the given string array and updates the backend*/
  public editInfraestructureTypes(infrastructureTypes: string[]) {
    this.docService
      .edit(this.activeCaseDocument.id, "infrastructure_types", {
        infrastructure_types: infrastructureTypes,
      })
      .subscribe(
        (response) => {
          this.activeCaseDocument.infrasDocList = infrastructureTypes;
          this.activeCaseDocument.docsize = response.doc_size;
          this.updateSource();
          this.snackBar.open("Infrastructure Types Saved");
        },
        (error) => this.showError(error.error.message.infrastructure_types)
      );
  }

  /**Changes the active document damage types to the given string array and updates the backend*/
  public editDamageTypes(damageTypes: string[]) {
    this.docService
      .edit(this.activeCaseDocument.id, "damage_types", {
        damage_types: damageTypes,
      })
      .subscribe(
        (response) => {
          this.activeCaseDocument.damageDocList = damageTypes;
          this.activeCaseDocument.docsize = response.doc_size;
          this.updateSource();
          this.snackBar.open("Damage Types Saved");
        },
        (error) => this.showError(error.error.message.damage_types)
      );
  }

  /**Changes the active document actors to the given Actor array and updates the backend*/
  public editActors(actors: any) {
    let body = {
      actors: this.getEditActorRequest(actors.actors),
    };
    this.docService.edit(this.activeCaseDocument.id, "actors", body).subscribe(
      (response) => {
        this.activeCaseDocument.actor = actors.actors;
        this.activeCaseDocument.docsize = response.doc_size;
        this.updateSource();
        this.snackBar.open("Actors Saved");
      },
      (error) => this.showError(error.error.message.actors)
    );
  }

  /**Changes the active document authors to the given Actor array and updates the backend*/
  public editAuthors(authors: any) {
    let body = {
      authors: this.getEditAuthorRequest(authors.authors),
    };
    this.docService.edit(this.activeCaseDocument.id, "authors", body).subscribe(
      (response) => {
        this.activeCaseDocument.author = authors.authors;
        this.activeCaseDocument.docsize = response.doc_size;
        this.updateSource();
        this.snackBar.open("Authors Saved");
      },
      (error) => this.showError(error.error.message.authors)
    );
  }

  /**Changes the active document locations to the given string array and updates the backend*/
  public editLocations(locals: string[]) {
    this.docService
      .edit(this.activeCaseDocument.id, "locations", { locations: locals })
      .subscribe(
        (response) => {
          this.activeCaseDocument.location = locals;
          this.activeCaseDocument.docsize = response.doc_size;
          this.updateSource();
          this.snackBar.open("Locations Saved");
        },
        (error) => this.showError(error.error.message.locations)
      );
  }

  /**Changes the active document tags to the given string array and updates the backend*/
  public editTags(tags: string[]) {
    this.docService
      .edit(this.activeCaseDocument.id, "tags", { tags: tags })
      .subscribe(
        (response) => {
          this.activeCaseDocument.tagsDoc = tags;
          this.activeCaseDocument.docsize = response.doc_size;
          this.updateSource();
          this.snackBar.open("Tags Saved");
        },
        (error) => this.showError("Error uploading tags")
      );
  }

  /**Change the active document incident date to the given date and updates the backend*/
  public editIncidentDate(incidentDay: Date) {
    let incidentDayString = this.datePipe.transform(incidentDay, "yyyy-MM-dd");
    this.docService
      .edit(this.activeCaseDocument.id, "incident_date", {
        incident_date: incidentDayString,
      })
      .subscribe(
        (response) => {
          this.activeCaseDocument.incidentDate = incidentDay;
          this.activeCaseDocument.docsize = response.doc_size;
          this.updateSource();
          this.snackBar.open("Incident Date Saved");
        },
        (error) => this.showError("Server error")
      );
  }

  /**Send request to update the section on the server*/
  public editSection(sec: ContentSection, position: number): Observable<any> {
    return this.docService
      .editDocumentSection(this.activeCaseDocument.id, sec, position)
      .pipe(
        tap((response) => {
          this.activeCaseDocument.section[position - 1] = sec;
          this.activeCaseDocument.docsize = response.doc_size;
          this.updateSource();
        })
      );
  }

  /**Sends request to create a section to the server and updates cached section list */
  public createSection() {
    console.log("this.createSection executed");
    this.docService.createSection(this.activeCaseDocument.id).subscribe((x) => {
      this.activeCaseDocument.section.push(
        new ContentSection(
          `Section No. ${this.activeCaseDocument.section.length + 1} `,
          ""
        )
      );
      this.updateSource();
    });
  }

  /**Sends request to remove a section to the server and updates cached section list */
  public removeSection(sectionPosition: number) {
    this.docService
      .removeSection(this.activeCaseDocument.id, sectionPosition)
      .subscribe((x) => {
        this.activeCaseDocument.section.splice(sectionPosition - 1, 1);
        this.updateSource();
      });
  }

  /**Opens document page in the search space service in a new tab */
  public previewDocumentOnSearchSpace() {
    window.open(
      `${environment.searchSpacePreview}/${this.activeCaseDocument.id}`
    ); // URL to web api
  }

  /**Returns the Content Section object refered by sectionPosition. Returns null if section does not exist
   * @param sectionPosition section position of the content section to open, starts from 1.
   */
  public getActiveSection(sectionPosition: number): ContentSection {
    if (
      sectionPosition > 0 &&
      sectionPosition <= this.activeCaseDocument.section.length
    ) {
      return this.activeCaseDocument.section[sectionPosition - 1];
    }
    return null;
  }

  /**Returns a request friendly list of authors as specified on AuthorPutRequest model.
   * @param authors list of authors as specified on the Author model
   */
  private getEditAuthorRequest(authors: Author[]): AuthorPutRequest[] {
    return authors.map((author) => {
      return new AuthorPutRequest(
        author.author_FN,
        author.author_LN,
        author.author_email,
        author.author_faculty
      );
    });
  }

  /**Returns a request friendly list of actors as specified on ActorPutRequest model.
   * @param actors list of actors as specified on the Actor model
   */
  private getEditActorRequest(actors: Actor[]): ActorPutRequest[] {
    return actors.map((actor) => {
      return new ActorPutRequest(actor.actor_FN, actor.actor_LN, actor.role);
    });
  }

  /**Displays an error snackbar defined by the errorMessage pased as parameter
   * @param errorMessage string to display on error snackbar.
   */
  showError(errorMessage: string): void {
    this.snackBar.open(errorMessage, "X", {
      panelClass: ["red-snackbar"],
      duration: 10000,
    });
  }
}
