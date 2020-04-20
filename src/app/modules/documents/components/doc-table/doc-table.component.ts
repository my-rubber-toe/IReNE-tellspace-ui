/**Modified from Angular Material Source
 * @packageDocumentation
 */

import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { CaseDocumentMetadata } from "@app/shared/models/case-document-metadata";
import { DocumentsService } from "@app/core/services/documents.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";

/**
 * @title Table with sorting
 */
@Component({
  selector: "app-doc-table",
  styleUrls: ["doc-table.component.scss"],
  templateUrl: "doc-table.component.html",
})
export class DocTableComponent implements OnInit {
  displayedColumns: string[] = [
    "title",
    "published",
    "lastModificationDate",
    "creationDate",
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() paginator: MatPaginator;
  @Input() isEmpty: boolean;

  isLoading = true;

  dataSource: MatTableDataSource<CaseDocumentMetadata>;

  constructor(private docService: DocumentsService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.refresh();
  }

  /**Method to navigate to the editor of the clicked case study */
  editDocument(element: CaseDocumentMetadata) {
    this.router.navigateByUrl("/edit/" + element.id);
  }

  refresh(): void {
    this.isLoading = true;
    this.docService.getDocuments().subscribe((metadata) => {
      this.dataSource.data = metadata;
      console.log(this.dataSource.data);
      this.isLoading = false;
      if (this.dataSource.data.length > 0) this.isEmpty = false;
      else this.isEmpty = true;
      console.log(this.isEmpty);
    });
  }

  removeDocument(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "black",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.docService.removeDocument(id).subscribe((_) => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.refresh();
        });
      }
    });
  }
}
