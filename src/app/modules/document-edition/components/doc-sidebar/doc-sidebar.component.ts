import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { CaseDocument } from "@app/models/case-document";

@Component({
  selector: "app-doc-sidebar",
  templateUrl: "./doc-sidebar.component.html",
  styleUrls: ["./doc-sidebar.component.scss"]
})
export class DocSidebarComponent {
  constructor(
    private editService: DocumentEditionService,
    private router: Router
  ) {}

  caseDocument: CaseDocument;

  ngOnInit(): void {
    this.editService
      .getDocumentStream()
      .subscribe(x => (this.caseDocument = x));
  }

  addSection() {
    this.editService.createSection();
  }

  public navigateToCaseStudyRoot(): void {
    this.router.navigateByUrl(`/edit/${this.caseDocument.id}`);
  }
}
