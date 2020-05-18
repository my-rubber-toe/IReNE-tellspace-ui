/**Social login configuration: Sets Up the provider for the social login
 * @author Alberto Canela (alberto.canela@upr.edu)
 */
import { AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";
/**Returns the configuration of Google oAuth provider */
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
