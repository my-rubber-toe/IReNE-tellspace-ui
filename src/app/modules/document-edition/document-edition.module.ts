import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimelineEditorComponent } from "./timeline-editor/timeline-editor.component";
import { ParametersEditorComponent } from "./parameters-editor/parameters-editor.component";
import { DocumentOptionsComponent } from "./document-options/document-options.component";
import { RouterModule } from "@angular/router";
import { SectionEditorComponent } from "./section-editor/section-editor.component";
import { InvalidUrlComponent } from "./invalid-url/invalid-url.component";

@NgModule({
  declarations: [
    TimelineEditorComponent,
    ParametersEditorComponent,
    DocumentOptionsComponent,
    SectionEditorComponent,
    InvalidUrlComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class DocumentEditionModule {}
