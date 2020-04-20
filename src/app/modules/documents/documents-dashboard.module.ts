import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocTableComponent } from "./components/doc-table/doc-table.component";
import { MaterialModule } from "@app/angular-material/material.module";
import { NewDocumentDialogComponent } from "./components/new-document.dialog/new-document.dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DocumentsDashboardRoutingModule } from "./documents-dashboard-routing.module";
import { DocumentsDashboardComponent } from './documents-dashboard.component';

@NgModule({
  declarations: [DocumentsDashboardComponent, DocTableComponent, NewDocumentDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DocumentsDashboardRoutingModule,
  ],
  exports: [],
  entryComponents: [NewDocumentDialogComponent],
})
export class DocumentsDashboardModule {}
