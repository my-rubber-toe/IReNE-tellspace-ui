import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { CaseDocument } from "@app/models/case-document";
import { DocumentsService } from "./documents.service";
import { ContentSection } from "@app/models/content-section";
import { Timeline } from "@app/models/timeline";
import { Actor } from "@app/models/actor";
import { Author } from "@app/models/author";

@Injectable({
  providedIn: "root"
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
    this.docService.edit("title", { title: newTitle }).subscribe(_ => {
      this.updateSource();
    });
  }

  /**Changes the active document description to the given string and updates the backend*/
  public editDescription(descriptionText: string) {
    this.activeCaseDocument.description = descriptionText;
    this.docService
      .edit("description", { description: descriptionText })
      .subscribe(_ => {
        this.updateSource();
      });
  }

  /**Changes the active document timeline to the given timeline array and updates the backend*/
  public editTimeline(newTimeline: Timeline[]) {
    this.activeCaseDocument.timeline = newTimeline;
    this.docService.edit("timeline", { timeline: newTimeline }).subscribe(_ => {
      this.updateSource();
    });
  }

  /**Changes the active document infraestructure types to the given string array and updates the backend*/
  public editInfraestructureTypes(infrastructureTypes: string[]) {
    this.activeCaseDocument.infrastructure_type = infrastructureTypes;
    this.docService
      .edit("infrastructure_types", {
        infrastructure_type: infrastructureTypes
      })
      .subscribe(_ => {
        this.updateSource();
      });
  }

  /**Changes the active document damage types to the given string array and updates the backend*/
  public editDamageTypes(damageTypes: string[]) {
    this.activeCaseDocument.damage_type = damageTypes;
    this.docService
      .edit("damage_types", { damage_type: damageTypes })
      .subscribe(_ => {
        this.updateSource();
      });
  }

  /**Changes the active document actors to the given Actor array and updates the backend*/
  public editActors(actors: Actor[]) {
    this.activeCaseDocument.actors = actors;
    this.docService.edit("actors", { actors: actors }).subscribe(_ => {
      this.updateSource();
    });
  }

  /**Changes the active document authors to the given Actor array and updates the backend*/
  public editAuthors(authors: Author[]) {
    this.activeCaseDocument.authors = authors;
    this.docService.edit("actors", { authors: authors }).subscribe(_ => {
      this.updateSource();
    });
  }

  /**Changes the active document locations to the given string array and updates the backend*/
  public editLocations(locations: string[]) {
    this.activeCaseDocument.location = locations;
    this.docService.edit("locations", { location: locations }).subscribe(_ => {
      this.updateSource();
    });
  }

  /**Changes the active document tags to the given string array and updates the backend*/
  public editTags(tags: string[]) {
    this.activeCaseDocument.tags = tags;
    this.docService.edit("tags", { tags: tags }).subscribe(_ => {
      this.updateSource();
    });
  }

  public editSection(sec: ContentSection) {
    this.activeCaseDocument.section[sec.section_nbr] = sec;
    this.docService.editDocumentSection(sec).subscribe(_ => {
      this.updateSource();
    });
  }

  public createSection() {
    console.log("this.createSection executed");
    this.docService.createSection(this.activeCaseDocument.id).subscribe(x => {
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
      .subscribe(x => {
        this.activeCaseDocument.section.splice(sectionPosition, 1);
        this.updateSource();
      });
  }
}
