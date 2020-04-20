import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { MaterialModule } from "@app/angular-material/material.module";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRoutingModule, CommonModule, MaterialModule],
})
export class LoginModule {}
