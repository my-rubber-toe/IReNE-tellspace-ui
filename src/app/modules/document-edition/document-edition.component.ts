import { Component, OnInit } from "@angular/core";
import { CaseDocument } from "@app/models/case-document";
import { DocumentEditionService } from "@app/core/services/document-edition.service";

@Component({
  selector: "app-document-edition",
  templateUrl: "./document-edition.component.html",
  styleUrls: ["./document-edition.component.scss"]
})
export class DocumentEditionComponent implements OnInit {
  public isSaving: boolean;

  constructor(private editService: DocumentEditionService) {}

  caseDocument: CaseDocument;

  ngOnInit(): void {
    this.editService
      .getDocumentStream()
      .subscribe(x => (this.caseDocument = x));
  }

  onAdded() {
    this.editService.createSection();
  }
}
