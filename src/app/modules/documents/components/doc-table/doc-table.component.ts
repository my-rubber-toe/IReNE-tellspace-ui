/**Modified from Angular Material Source
 * @packageDocumentation
 */

import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Document } from "@app/interfaces/document";
import { DocumentsService } from "@app/core/services/documents.service";
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
    "incident_date",
    "creationDate"
  ];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isLoading = true;

  constructor(private docService: DocumentsService, private router: Router) {}

  ngOnInit() {
    this.dataSource = this.docService.getMetadataStream();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.docService.getDocuments();
    this.isLoading = false;
  }

  /**Method to navigate to the editor of the clicked case study */
  editDocument(element: Document) {
    this.router.navigateByUrl("/edit/" + element.id);
  }
}
