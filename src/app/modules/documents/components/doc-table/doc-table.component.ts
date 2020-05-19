/**Modified from Angular Material Source
 * @packageDocumentation
 */

import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { DocumentsService } from "@app/core/services/documents.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import { CaseDocumentMetadata } from "@app/shared/models/case-document-metadata";

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
    "actions",
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<CaseDocumentMetadata>;

  constructor(private docService: DocumentsService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**Method to navigate to the editor of the clicked case study */
  editDocument(element: CaseDocumentMetadata) {
    this.router.navigateByUrl("/edit/" + element.id);
  }

  loadTable(metadata: CaseDocumentMetadata[]) {
    this.dataSource.data = metadata;
  }

  removeDocument(id: string, index: number): void {
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
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.dataSource.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  }
}
