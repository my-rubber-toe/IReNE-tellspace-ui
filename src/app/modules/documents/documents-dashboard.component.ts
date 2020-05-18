import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NewDocumentDialogComponent } from "./components/new-document.dialog/new-document.dialog.component";
import { DocumentsService } from "@app/core/services/documents.service";
import { CaseDocumentCreateRequest } from "@app/shared/models/case-document-create-request";
import { CaseDocumentMetadata } from "@app/shared/models/case-document-metadata";
import { DocTableComponent } from "./components/doc-table/doc-table.component";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-documents-dashboard",
  templateUrl: "./documents-dashboard.component.html",
  styleUrls: ["./documents-dashboard.component.scss"],
})
export class DocumentsDashboardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private docService: DocumentsService,
    private router: Router
  ) {}

  @ViewChild(DocTableComponent) table: DocTableComponent;

  docs: CaseDocumentMetadata[] = [];

  loading: boolean;

  /**Constant maximum nuber of case documentfies that a collaborator can create */
  readonly DOCUMENTS_MAX: number = 10;

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
      (error) => {
        Swal.fire({
          title: "Server is not responding",
          text: "Do you want to try again or exit the application?",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "green",
          cancelButtonColor: "black",
          cancelButtonText: "Try Again",
          confirmButtonText: "Exit TellSpace",
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            //If user chooses to exit clear session and navigate to login
            localStorage.clear();
            this.router.navigateByUrl("login");
          } else {
            //Reload the entire page to trigger the requests again
            window.location.reload();
          }
        });
      }
    );
  }

  public promptNewDocumentForm(): void {
    if (this.docs.length < this.DOCUMENTS_MAX) {
      let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false; //Disable Autofocus on opened dialog
      dialogConfig.restoreFocus = false; //Disable focus of dialog open button after closing.
      dialogConfig.disableClose = true; //Disable close by touching outside the dialog.
      let dialogRef = this.dialog.open(
        NewDocumentDialogComponent,
        dialogConfig
      );
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
    } else {
      //if the collaborator already has the maximum of allowed case studies
      Swal.fire(
        "Maximum Case Studies Limit Reached",
        `You can own up to ${this.DOCUMENTS_MAX} case studies. Please delete one of your existing case studies and try again`,
        "error"
      );
    }
  }
}
