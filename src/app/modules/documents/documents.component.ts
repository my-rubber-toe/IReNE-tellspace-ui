import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NewDocumentDialogComponent } from "./components/new-document.dialog/new-document.dialog.component";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"]
})
export class DocumentsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public promptNewDocumentForm(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(NewDocumentDialogComponent, dialogConfig);
  }
}
