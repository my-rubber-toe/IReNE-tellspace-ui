import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./layouts/default/default.component";
import { DocumentsComponent } from "./modules/documents/documents.component";
import { LoginComponent } from "./modules/login/login.component";
import { DocumentEditionComponent } from "./modules/document-edition/document-edition.component";
import { SectionEditorComponent } from "./modules/document-edition/section-editor/section-editor.component";
import { DocumentOptionsComponent } from "./modules/document-edition/document-options/document-options.component";
import { InvalidUrlComponent } from "./modules/document-edition/invalid-url/invalid-url.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "docs",
        component: DocumentsComponent
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
          },
          {
            path: "",
            component: InvalidUrlComponent
          }
        ]
      },
      {
        path: "",
        component: DocumentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
