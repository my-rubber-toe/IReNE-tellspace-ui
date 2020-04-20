import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoreComponent } from "./core/core.component";
import { InvalidUrlComponent } from "./core/invalid-url/invalid-url.component";
import { CaseDocumentResolverService } from "@app/core/services/case-document-resolver.service";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "",
    component: CoreComponent,
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
