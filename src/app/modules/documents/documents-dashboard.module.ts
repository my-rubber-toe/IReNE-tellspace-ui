import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocTableComponent } from "./components/doc-table/doc-table.component";
import { MaterialModule } from "@app/material.module";
import { NewDocumentDialogComponent } from "./components/new-document.dialog/new-document.dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DocumentsDashboardRoutingModule } from "./documents-dashboard-routing.module";

@NgModule({
  declarations: [DocTableComponent, NewDocumentDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DocumentsDashboardRoutingModule,
  ],
  exports: [DocTableComponent],
  entryComponents: [NewDocumentDialogComponent],
})
export class DocumentsDashboardModule {}
