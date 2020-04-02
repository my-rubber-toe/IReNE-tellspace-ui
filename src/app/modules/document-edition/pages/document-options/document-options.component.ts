import { Component, OnInit, Input } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

import { CaseDocument } from "@app/models/case-document";
import { Author } from "@app/models/author";
import { DocumentEditionService } from "@app/core/services/document-edition.service";

@Component({
  selector: "app-document-options",
  templateUrl: "./document-options.component.html",
  styleUrls: ["./document-options.component.scss"]
})
export class DocumentOptionsComponent implements OnInit {
  doc: CaseDocument;

  infrastructureList: string[] = ["House"];
  damageTypeList: string[] = ["Storm"];
  constructor(private editService: DocumentEditionService) {}

  ngOnInit(): void {
    this.editService.getDocumentStream().subscribe(x => (this.doc = x));
  }

  editTitlePrompt() {
    alert("Title Needed");
  }
}
