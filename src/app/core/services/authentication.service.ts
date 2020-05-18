/**Authentication Service to manage requests to the server side authentication procesess
 * @author Alberto Canela (alberto-canela@upr.edu)
 */

import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { Observable, of, BehaviorSubject } from "rxjs";
import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient, HttpHeaders, HttpBackend } from "@angular/common/http";
import { Tokens } from "@app/shared/models/tokens";
import { Router } from "@angular/router";
import { Profile } from "@app/shared/models/profile";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  /**stores the URL so we can redirect after logging in */

  redirectUrl: string;

  /**Root Url of the API for authentication requests */
  private rootUrl = environment.rootUrl; // URL to web api

  /**Initial Headers for http requests from this service*/
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset-utf-8",
      Accept: "application/json",
    }),
  };

  /**Source that stores the current collaborator name and publish it to the collaborator_name$ stream*/
  private collaborator_source: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem("collaborator_name") || ""
  );

  /**collaborator_name$ string stream which can be subscribed to get the current collaborator name*/
  private collaborator_name$: Observable<
    string
  > = this.collaborator_source.asObservable();

  private httpNoInterceptor: HttpClient;

  constructor(
    private socialAuthService: AuthService,
    private http: HttpClient,
    backend: HttpBackend,
    private router: Router
  ) {
    this.httpNoInterceptor = new HttpClient(backend);
  }

  /**Main login function, called to request authentication with Google oAuth
   * and request a token depending on the response from Google.
   */
  public signin() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    localStorage.clear(); //To eliminate any remanents from sessions which did not logout successfully.

    //Call to the external socialAuthService wich handles Google oAuth
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        //on success this will return user data from google.
        Swal.fire(`Authenticating with Tell Space.\n Please wait`);
        Swal.showLoading();

        //Check if the user has an email from the upr domain
        if (/^[a-z0-9._%+-]+@upr.edu$/.test(userData.email)) {
          this.getLoginToken(userData.idToken).subscribe(
            (result) => {
              Swal.fire("Login Successful", "Welcome to Tell Space", "success");
              this.setCollaboratorSession(
                result,
                userData.name,
                userData.email,
                userData.photoUrl
              );
              this.setCollaboratorName(userData.name);
              this.socialAuthService.signOut();
              this.router.navigateByUrl(this.redirectUrl || "");
            },
            (error) => {
              Swal.fire(
                "Login Failed",
                "Unauthorized Collaborator. Please, request access",
                "error"
              );
              console.log(error);
            }
          );
        } else {
          //if the user email is invalid
          Swal.fire(
            "Login Failed",
            "Service available only for users with a upr account",
            "error"
          );
          this.socialAuthService.signOut();
        }
      },
      (err) => console.log(err) //Logs errors from Google oAuth
    );
  }

  /**GET request to the server for a collaborator token
   * @param googleID valid token Id returned from google
   */
  private getLoginToken(googleId: string): Observable<Tokens> {
    const url = `${this.rootUrl}/auth/login/${googleId}`;
    return this.http.get<Tokens>(url, this.httpOptions);
  }

  /**Delete request to the server for logout of the service
   */
  private logoutFromServer(): Observable<any> {
    const url = `${this.rootUrl}/auth/logout`;
    return this.http.delete(url, this.httpOptions);
  }

  /**Saves the collaborator session values to localhost
   */
  private setCollaboratorSession(
    token: Tokens,
    name: string,
    email: string,
    photoUrl: string
  ) {
    console.log("token", token);
    localStorage.setItem("collaborator_name", name);
    localStorage.setItem("collaborator_email", email);
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("refresh_token", token.refresh_token);
    // localStorage.setItem("access_expiration", token.access_expiration);
    let expiration = localStorage.setItem("photo_url", photoUrl);
  }

  /**Main logout function called to logut from the server and clear local storage
   */
  logout(): void {
    this.logoutFromServer().subscribe((result) => {
      localStorage.clear();
      this.router.navigateByUrl("login");
      Swal.fire("Logout Successful", "Goodbye", "success");
    });
  }

  /**Returns true if a collaborator has a valid token. An expired token is refreshed before reaching a final result.
   */
  public isLoggedIn(): boolean {
    let token = localStorage.getItem("access_token");
    if (token == null) return false;
    let now = new Date();
    if (now > this.parseJWTExpiration(token)) {
      //if access token is expired try to refresh
      token = localStorage.getItem("refresh_token");
      if (token && now < this.parseJWTExpiration(token)) {
        this.refreshToken().subscribe(
          (access_token) => {
            console.log("Refreshed Token");
            return true;
          },
          (error) => {
            this.expire();
            this.router.navigateByUrl("login");
            return false;
          }
        );
      } else {
        this.expire();
        this.router.navigateByUrl("login");
        return false;
      }
    }
    return true;
  }

  /**Gets a collaborator name from the information stored in the local storage
   */
  public getCollaboratorName(): Observable<string> {
    return this.collaborator_name$;
  }

  /**Sets the collaborator name on the stream mantained by this service
   */
  private setCollaboratorName(name: string) {
    this.collaborator_source.next(name);
  }

  /**Returns the system profile of a collaborator
   */
  public getCollaboratorProfile(): Observable<Profile> {
    const url = `${this.rootUrl}/auth/me`;
    return this.http.get<Profile>(url);
  }

  /**GET request for a new access_token using a refresh token on localStorage.
   * Uses no interceptor http handler so it cannot catch by any interceptor on the app*/
  public refreshToken(): Observable<{ access_token: string }> {
    const refreshToken = localStorage.getItem("refresh_token");
    return this.httpNoInterceptor
      .get<{ access_token: string }>(`${this.rootUrl}/refresh`, {
        headers: new HttpHeaders({ Authorization: `Bearer  +${refreshToken}` }),
      })
      .pipe(
        tap((token) => {
          localStorage.setItem("access_token", token.access_token);
        })
      );
  }

  /**Clears the session data and fires a sexion expired error, caller is responsible to redirect the user out of the app */
  public expire() {
    localStorage.clear();
    Swal.fire("Session Expired", "Please login again", "error");
  }

  /**Returns the expiration of a valid jwt token string as Date*/
  private parseJWTExpiration(token: string): Date {
    let decodedData = this.jwt_decode(token);
    return new Date(decodedData.exp * 1000);
  }

  /**Decodes a jwt token*/
  private jwt_decode(t: string) {
    let parts = t.split(".");
    return JSON.parse(atob(parts[1]));
  }
}
