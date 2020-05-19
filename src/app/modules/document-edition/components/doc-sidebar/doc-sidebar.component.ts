import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { CaseDocument } from "@app/shared/models/case-document";

@Component({
  selector: "app-doc-sidebar",
  templateUrl: "./doc-sidebar.component.html",
  styleUrls: ["./doc-sidebar.component.scss"],
})
export class DocSidebarComponent {
  constructor(
    private editService: DocumentEditionService,
    private router: Router
  ) {}

  /**Reference to the active and updated case document opened for edition */
  caseDocument: CaseDocument;

  /**Creating Section Flag used to limit the section creation form */
  creatingSection: boolean = false;

  /**The maximum amount of sections a coaborator can add to the case study */
  readonly SECTION_MAX: number = 10;

  ngOnInit(): void {
    this.editService
      .getDocumentStream()
      .subscribe((x) => (this.caseDocument = x));
  }

  addSection() {
    this.creatingSection = true;
    this.editService
      .createSection()
      .subscribe((success) => (this.creatingSection = false));
  }

  public navigateToCaseStudyRoot(): void {
    this.router.navigateByUrl(`/edit/${this.caseDocument.id}`);
  }
}
