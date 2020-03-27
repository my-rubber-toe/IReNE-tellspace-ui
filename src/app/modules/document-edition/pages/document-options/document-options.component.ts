import { Component, OnInit, Input } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

import { CaseDocument } from "@app/models/case-document";
import { Author } from "@app/models/author";

@Component({
  selector: "app-document-options",
  templateUrl: "./document-options.component.html",
  styleUrls: ["./document-options.component.scss"]
})
export class DocumentOptionsComponent implements OnInit {
  @Input() doc: CaseDocument;

  infrastructureList: string[] = ["House"];
  damageTypeList: string[] = ["Storm"];
  constructor() {}

  ngOnInit(): void {}

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  editTitlePrompt() {
    alert("Title Needed");
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.doc.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(tag: string): void {
    const index = this.doc.tags.indexOf(tag);

    if (index >= 0) {
      this.doc.tags.splice(index, 1);
    }
  }
}
