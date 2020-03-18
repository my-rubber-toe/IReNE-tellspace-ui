import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { DocumentsComponent } from "src/app/modules/documents/documents.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { DocumentEditionModule } from "src/app/modules/document-edition/document-edition.module";
import { DocumentEditionComponent } from "src/app/modules/document-edition/document-edition.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { DocumentsModule } from "src/app/modules/documents/documents.module";
import { MaterialModule } from "src/app/material.module";
import { LoginComponent } from "src/app/modules/login/login.component";

@NgModule({
  declarations: [
    DefaultComponent,
    DocumentsComponent,
    DocumentEditionComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DocumentEditionModule,
    DocumentsModule,
    MatSidenavModule,
    MatDividerModule,
    MaterialModule
  ]
})
export class DefaultModule {}
