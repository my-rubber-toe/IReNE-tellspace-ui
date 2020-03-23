import { Component, OnInit } from "@angular/core";
import { Document } from "@app/models/document";

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
  }

  editTitlePrompt() {
    alert("Title Needed");
  }
}
