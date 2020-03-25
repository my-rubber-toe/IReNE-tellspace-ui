import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NewDocumentDialogComponent } from "./components/new-document.dialog/new-document.dialog.component";
import { DocTableComponent } from "./components/doc-table/doc-table.component";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"]
})
export class DocumentsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  @ViewChild(DocTableComponent) docTable: DocTableComponent;

  @ViewChild("changeButton") private changeButton: ElementRef;

  ngOnInit(): void {}

  public promptNewDocumentForm(): void {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(NewDocumentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.docTable.refresh();
    });
  }
}
