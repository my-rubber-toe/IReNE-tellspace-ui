import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { SharedModule } from "@app/shared/shared.module";
import { MaterialModule } from "@app/material.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, MaterialModule, SharedModule],
})
export class ProfileModule {}
