import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";

import { getAuthServiceConfigs } from "./configs/socialloginConfig";
// used to create fake backend
import { fakeBackendProvider } from "../testing/mock-backend-interceptor";
import { DatePipe } from "@angular/common";
import { AuthInterceptorProvider } from "./core/interceptors/auth-interceptor";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SocialLoginModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },

    DatePipe,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    AuthInterceptorProvider,
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
