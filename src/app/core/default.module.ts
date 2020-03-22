import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { DocumentsComponent } from "@app/modules/documents/documents.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { DocumentEditionModule } from "@app/modules/document-edition/document-edition.module";
import { DocumentEditionComponent } from "@app/modules/document-edition/document-edition.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { DocumentsModule } from "@app/modules/documents/documents.module";
import { MaterialModule } from "@app/material.module";
import { LoginComponent } from "@app/modules/login/login.component";

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
