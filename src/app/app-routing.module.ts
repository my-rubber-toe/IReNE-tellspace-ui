import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./core/default.component";
import { DocumentsDashboardComponent } from "./modules/documents/documents-dashboard.component";
import { LoginComponent } from "./modules/login/login.component";
import { DocumentEditionComponent } from "./modules/document-edition/document-edition.component";
import { SectionEditorComponent } from "./modules/document-edition/pages/section-editor/section-editor.component";
import { DocumentOptionsComponent } from "./modules/document-edition/pages/document-options/document-options.component";
import { InvalidUrlComponent } from "./modules/invalid-url/invalid-url.component";
import { CaseDocumentResolverService } from "@app/core/services/case-document-resolver.service";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "",
        //canActivateChild: [AuthGuard],
        children: [
          {
            path: "docs",
            component: DocumentsDashboardComponent
          },
          {
            path: "edit/:docid",
            component: DocumentEditionComponent,
            resolve: {
              caseDocument: CaseDocumentResolverService
            },
            children: [
              {
                path: "s/:secid",
                component: SectionEditorComponent
              },
              {
                path: "",
                component: DocumentOptionsComponent
              }
            ]
          },
          {
            path: "",
            redirectTo: "/docs",
            pathMatch: "full"
          }
        ]
      },
      {
        path: "**",
        component: InvalidUrlComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
