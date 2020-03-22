import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocTableComponent } from "./components/doc-table/doc-table.component";
import { MaterialModule } from "src/app/material.module";
import { NewDocumentDialogComponent } from "./components/new-document.dialog/new-document.dialog.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [DocTableComponent, NewDocumentDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [DocTableComponent],
  entryComponents: [NewDocumentDialogComponent]
})
export class DocumentsModule {}
