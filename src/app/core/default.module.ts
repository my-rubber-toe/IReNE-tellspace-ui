import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { DocumentsDashboardComponent } from "@app/modules/documents/documents-dashboard.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { DocumentEditionModule } from "@app/modules/document-edition/document-edition.module";
import { DocumentEditionComponent } from "@app/modules/document-edition/document-edition.component";
import { DocumentsDashboardModule } from "@app/modules/documents/documents-dashboard.module";
import { MaterialModule } from "@app/material.module";
import { LoginComponent } from "@app/modules/login/login.component";

@NgModule({
  declarations: [
    DefaultComponent,
    DocumentsDashboardComponent,
    DocumentEditionComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DocumentEditionModule,
    DocumentsDashboardModule,
    MaterialModule
  ]
})
export class DefaultModule {}
