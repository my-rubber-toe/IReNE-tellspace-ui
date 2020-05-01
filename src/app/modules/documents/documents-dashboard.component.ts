import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NewDocumentDialogComponent } from "./components/new-document.dialog/new-document.dialog.component";
import { DocumentsService } from "@app/core/services/documents.service";
import { CaseDocumentCreateRequest } from "@app/shared/models/case-document-create-request";
import { CaseDocumentMetadata } from "@app/shared/models/case-document-metadata";
import { DocTableComponent } from "./components/doc-table/doc-table.component";

@Component({
  selector: "app-documents-dashboard",
  templateUrl: "./documents-dashboard.component.html",
  styleUrls: ["./documents-dashboard.component.scss"],
})
export class DocumentsDashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private docService: DocumentsService) {}

  @ViewChild(DocTableComponent) table: DocTableComponent;

  docs: CaseDocumentMetadata[] = [];

  loading: boolean;

  ngOnInit(): void {
    this.loadDocuments();
  }

  private loadDocuments() {
    this.loading = true;
    this.docService.getDocuments().subscribe(
      (documents) => {
        this.docs = documents;
        this.loading = false;
        this.table.loadTable(this.docs);
      },
      (error) => alert(error)
    );
  }

  public promptNewDocumentForm(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false; //Disable Autofocus on opened dialog
    dialogConfig.restoreFocus = false; //Disable focus of dialog open button after closing.
    dialogConfig.disableClose = true; //Disable close by touching outside the dialog.
    let dialogRef = this.dialog.open(NewDocumentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("this data ", result);
        this.docService
          .createDocument(result as CaseDocumentCreateRequest)
          .subscribe((success_response) => {
            this.loadDocuments();
          });
      }
    });
  }
}
