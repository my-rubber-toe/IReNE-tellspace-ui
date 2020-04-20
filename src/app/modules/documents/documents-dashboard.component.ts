import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NewDocumentDialogComponent } from "./components/new-document.dialog/new-document.dialog.component";
import { DocTableComponent } from "./components/doc-table/doc-table.component";
import { DocumentsService } from "@app/core/services/documents.service";
import { CaseDocumentCreateRequest } from "@app/shared/models/case-document-create-request";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: "app-documents-dashboard",
  templateUrl: "./documents-dashboard.component.html",
  styleUrls: ["./documents-dashboard.component.scss"]
})
export class DocumentsDashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private docService: DocumentsService) {}

  @ViewChild(DocTableComponent) docTable: DocTableComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isEmpty:boolean = true;

  ngOnInit(): void {}

  public promptNewDocumentForm(): void {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(NewDocumentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //TODO: CREATE DOCUMENT CREATE REQUEST FROM SCRATCH
        console.log("this data ", result);
        this.docService
          .createDocument(result as CaseDocumentCreateRequest)
          .subscribe(x => this.docTable.refresh());
      }
    });
  }
}
