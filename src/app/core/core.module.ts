import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreComponent } from "./core.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@app/angular-material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { InvalidUrlComponent } from '@app/core/invalid-url/invalid-url.component';

@NgModule({
  declarations: [CoreComponent, FooterComponent, HeaderComponent, InvalidUrlComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
})
export class CoreModule {}
