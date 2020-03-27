/**Modified from Angular Material Source
 * @packageDocumentation
 */

import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { CaseDocument } from "@app/models/case-document";
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
  templateUrl: "doc-table.component.html"
})
export class DocTableComponent implements OnInit {
  displayedColumns: string[] = [
    "title",
    "published",
    "incident_date",
    "creationDate"
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isLoading = true;
  dataSource: MatTableDataSource<CaseDocument>;

  constructor(private docService: DocumentsService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.docService.getDocuments().subscribe(x => (this.dataSource.data = x));
    this.isLoading = false;
  }

  /**Method to navigate to the editor of the clicked case study */
  editDocument(element: CaseDocument) {
    this.router.navigateByUrl("/edit/" + element.id);
  }

  refresh(): void {
    this.docService.getDocuments().subscribe(x => (this.dataSource.data = x));
  }

  removeDocument(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.docService
          .removeDocument(id)
          .subscribe(_ =>
            Swal.fire("Deleted!", "Your file has been deleted.", "success")
          );
      }
    });
  }
}
