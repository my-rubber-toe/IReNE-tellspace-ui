import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DefaultModule } from "./core/default.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";

import { getAuthServiceConfigs } from "./socialloginConfig";
// used to create fake backend
import { fakeBackendProvider } from "./interceptors/mock-backend-interceptor";
import { AuthInterceptorProvider } from "./interceptors/auth-interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DefaultModule,
    SocialLoginModule,
  ],
  providers: [
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
