/**Modified from Angular Material Source
 * @packageDocumentation
 */

import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Metadata } from "src/app/interfaces/metadata";
import { DocumentsService } from "src/app/core/services/documents.service";
import { Router } from "@angular/router";

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
    "incidentDate",
    "creationDate"
  ];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private metadata: Metadata[];

  constructor(private docService: DocumentsService, private router: Router) {}

  ngOnInit() {
    this.getMetadata();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getMetadata(): void {
    this.docService
      .getDocuments()
      .subscribe(metadata => (this.metadata = metadata));
    this.dataSource = new MatTableDataSource(this.metadata);
  }

  /**Method to navigate to the editor of the clicked case study */
  editDocument(element: Metadata) {
    this.router.navigateByUrl("/edit/" + element.id);
  }
}
