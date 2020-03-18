import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocTableComponent } from "./components/doc-table/doc-table.component";
import { MaterialModule } from "src/app/material.module";
import { DashSidebarComponent } from "./components/dash-sidebar/dash-sidebar.component";

@NgModule({
  declarations: [DocTableComponent, DashSidebarComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DocTableComponent, DashSidebarComponent]
})
export class DocumentsModule {}
