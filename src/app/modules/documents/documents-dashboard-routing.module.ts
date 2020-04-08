import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DocumentsDashboardComponent } from "./documents-dashboard.component";

const routes: Routes = [{ path: "", component: DocumentsDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsDashboardRoutingModule {}
