import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from "angularx-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "125759116505-flugvdnnv7lm6q6htj62uic5ut70e594.apps.googleusercontent.com"
      ),
    },
  ]);

  return config;
}
