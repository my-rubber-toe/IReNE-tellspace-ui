import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DocumentOptionsComponent } from "./pages/document-options/document-options.component";
import { SectionEditorComponent } from "./pages/section-editor/section-editor.component";
import { DocumentEditionComponent } from "./document-edition.component";

const routes: Routes = [
  {
    path: "",
    component: DocumentEditionComponent,
    children: [
      { path: "", pathMatch: "full", component: DocumentOptionsComponent },
      { path: "s/:secid", component: SectionEditorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentEditionRoutingModule {}
