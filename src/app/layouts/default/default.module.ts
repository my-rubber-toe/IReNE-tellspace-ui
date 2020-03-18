import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { DocumentsComponent } from "src/app/modules/documents/documents.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { DocumentEditionModule } from "src/app/modules/document-edition/document-edition.module";
import { DocumentEditionComponent } from 'src/app/modules/document-edition/document-edition.component';

@NgModule({
  declarations: [DefaultComponent, DocumentsComponent, DocumentEditionComponent],
  imports: [CommonModule, RouterModule, SharedModule, DocumentEditionModule]
})
export class DefaultModule {}
