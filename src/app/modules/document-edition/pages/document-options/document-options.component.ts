import { Component, OnInit } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

import { Document } from "@app/models/document";
import { Author } from "@app/models/author";

@Component({
  selector: "app-document-options",
  templateUrl: "./document-options.component.html",
  styleUrls: ["./document-options.component.scss"]
})
export class DocumentOptionsComponent implements OnInit {
  doc: Document;

  infrastructureList: string[] = ["House"];
  damageTypeList: string[] = ["Storm"];
  constructor() {}

  ngOnInit(): void {
    this.doc = new Document();
    this.doc.title = "Untitled";
    this.doc.tags = [
      "house",
      "light",
      "fish",
      "eatery",
      "asdfff",
      "ftfftty",
      "ftggggytytg",
      "5g5g5g5g5g",
      "gg5g55gtyg5y",
      "5gg5g5g5g5gg5",
      "Car"
    ];
    this.doc.description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
       et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
       ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
       cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.`;
    this.doc.authors = [new Author()];
    this.doc.authors[0].author_FN = "Alberto";
    this.doc.authors[0].author_LN = "Canela";
  }

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
