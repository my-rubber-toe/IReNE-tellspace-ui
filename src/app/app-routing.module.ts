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
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "",
        canActivateChild: [AuthGuard],
        children: [
          {
            path: "docs",
            loadChildren: () =>
              import("./modules/documents/documents-dashboard.module").then(
                (m) => m.DocumentsDashboardModule
              ),
          },
          {
            path: "edit/:docid",
            component: DocumentEditionComponent,
            resolve: {
              caseDocument: CaseDocumentResolverService,
            },
            loadChildren: () =>
              import("./modules/document-edition/document-edition.module").then(
                (m) => m.DocumentEditionModule
              ),
          },
          {
            path: "profile",
            loadChildren: () =>
              import("./modules/profile/profile.module").then(
                (m) => m.ProfileModule
              ),
          },
          {
            path: "",
            redirectTo: "/docs",
            pathMatch: "full",
          },
        ],
      },
      {
        path: "**",
        component: InvalidUrlComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
