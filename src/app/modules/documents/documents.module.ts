import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocTableComponent } from "./components/doc-table/doc-table.component";
import { MaterialModule } from "src/app/material.module";

@NgModule({
  declarations: [DocTableComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DocTableComponent]
})
export class DocumentsModule {}
