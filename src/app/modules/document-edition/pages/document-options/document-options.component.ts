import { Component, OnInit, Input } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

import { CaseDocument } from "@app/shared/models/case-document";
import { Author } from "@app/shared/models/author";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-document-options",
  templateUrl: "./document-options.component.html",
  styleUrls: ["./document-options.component.scss"]
})
export class DocumentOptionsComponent implements OnInit {
  doc: CaseDocument;

  titleControl: FormControl;

  editingTitle: boolean = false;
  constructor(private editService: DocumentEditionService) {}

  ngOnInit(): void {
    this.titleControl = new FormControl([""], Validators.required);
    this.editService.getDocumentStream().subscribe(x => {
      this.doc = x;
      this.titleControl.setValue(x.title);
    });
  }

  toggleTitleEdition() {
    this.editingTitle = !this.editingTitle;
  }

  saveTitle() {
    this.editService.editDocumentTitle(this.titleControl.value);
    this.toggleTitleEdition();
  }
}
