import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./core/default.component";
import { DocumentsComponent } from "./modules/documents/documents.component";
import { LoginComponent } from "./modules/login/login.component";
import { DocumentEditionComponent } from "./modules/document-edition/document-edition.component";
import { SectionEditorComponent } from "./modules/document-edition/pages/section-editor/section-editor.component";
import { DocumentOptionsComponent } from "./modules/document-edition/pages/document-options/document-options.component";
import { InvalidUrlComponent } from "./modules/document-edition/pages/invalid-url/invalid-url.component";

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "docs",
        component: DocumentsComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "edit",
        component: DocumentEditionComponent,
        children: [
          {
            path: ":docid",
            component: DocumentOptionsComponent
          },
          {
            path: ":docid/:secid",
            component: SectionEditorComponent
          }
        ]
      },
      {
        path: "",
        component: DocumentsComponent
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
