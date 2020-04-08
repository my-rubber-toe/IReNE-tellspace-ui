import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentOptionsComponent } from "./pages/document-options/document-options.component";
import { RouterModule } from "@angular/router";
import { SectionEditorComponent } from "./pages/section-editor/section-editor.component";
import { InvalidUrlComponent } from "../invalid-url/invalid-url.component";
import { DocSidebarComponent } from "./components/doc-sidebar/doc-sidebar.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MaterialModule } from "@app/material.module";
import { DescriptionEditorComponent } from './components/description-editor/description-editor.component';
import { TagsCategoriesEditorComponent } from './components/tags-categories-editor/tags-categories-editor.component';
import { LocationsEditorComponent } from './components/locations-editor/locations-editor.component';
import { DateTimelineEditorComponent } from './components/date-timeline-editor/date-timeline-editor.component';
import { AuthorsEditorComponent } from './components/authors-editor/authors-editor.component';
import { ActorsEditorComponent } from './components/actors-editor/actors-editor.component';
import { DocumentEditionRoutingModule } from './document-edition-routing.module';

@NgModule({
  declarations: [
    DocumentOptionsComponent,
    SectionEditorComponent,
    InvalidUrlComponent,
    DocSidebarComponent,
    DescriptionEditorComponent,
    TagsCategoriesEditorComponent,
    LocationsEditorComponent,
    DateTimelineEditorComponent,
    AuthorsEditorComponent,
    ActorsEditorComponent
  ],
  imports: [CommonModule, CKEditorModule, MaterialModule, DocumentEditionRoutingModule],
  exports: [DocSidebarComponent]
})
export class DocumentEditionModule {}
