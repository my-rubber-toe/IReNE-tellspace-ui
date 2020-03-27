import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimelineEditorComponent } from "./components/timeline-editor/timeline-editor.component";
import { DocumentOptionsComponent } from "./pages/document-options/document-options.component";
import { RouterModule } from "@angular/router";
import { SectionEditorComponent } from "./pages/section-editor/section-editor.component";
import { InvalidUrlComponent } from "../invalid-url/invalid-url.component";
import { DocSidebarComponent } from "./components/doc-sidebar/doc-sidebar.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MaterialModule } from "@app/material.module";

@NgModule({
  declarations: [
    TimelineEditorComponent,
    DocumentOptionsComponent,
    SectionEditorComponent,
    InvalidUrlComponent,
    DocSidebarComponent
  ],
  imports: [CommonModule, RouterModule, CKEditorModule, MaterialModule],
  exports: [DocSidebarComponent]
})
export class DocumentEditionModule {}
