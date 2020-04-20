import { Injectable } from "@angular/core";
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

import { AuthenticationService } from "@app/core/services/authentication.service";

/**Authentication Guard that prevents unauthenticated collaborators from accesing guarded routes */
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  /**Authentication Guard*/
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  /**Checks the login status of the collaborator, upon failure redirects the user to the login page */
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(["/login"]);
    return false;
  }
}
