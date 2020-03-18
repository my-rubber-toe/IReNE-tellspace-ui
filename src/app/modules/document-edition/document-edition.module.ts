import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimelineEditorComponent } from "./components/timeline-editor/timeline-editor.component";
import { ParametersEditorComponent } from "./components/parameters-editor/parameters-editor.component";
import { DocumentOptionsComponent } from "./pages/document-options/document-options.component";
import { RouterModule } from "@angular/router";
import { SectionEditorComponent } from "./pages/section-editor/section-editor.component";
import { InvalidUrlComponent } from "./pages/invalid-url/invalid-url.component";
import { DocSidebarComponent } from './components/doc-sidebar/doc-sidebar.component';

@NgModule({
  declarations: [
    TimelineEditorComponent,
    ParametersEditorComponent,
    DocumentOptionsComponent,
    SectionEditorComponent,
    InvalidUrlComponent,
    DocSidebarComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class DocumentEditionModule {}
