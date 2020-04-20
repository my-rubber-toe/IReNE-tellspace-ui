import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { Observable, of, BehaviorSubject } from "rxjs";
import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Tokens } from "@app/shared/models/tokens";
import { Router } from "@angular/router";
import { Profile } from "@app/shared/models/profile";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  /**stores the URL so we can redirect after logging in */ 
  redirectUrl: string;

  /**Root Url of the API for authentication requests */
  private rootUrl = "api/auth"; // URL to web api

  /**Initial Headers for http requests from this service*/
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  /**Source that stores the current collaborator name and publish it to the collaborator_name$ stream*/
  private collaborator_source: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem("collaborator_name") || ""
  );

  /**collaborator_name$ string stream which can be subscribed to get the current collaborator name*/
  private collaborator_name$: Observable<string> = this.collaborator_source.asObservable();

  constructor(
    private socialAuthService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  /**Main login function, called to request authentication with Google oAuth 
   * and request a token depending on the response from Google.
   */
  public signin() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    //Call to the external socialAuthService wich handles Google oAuth
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        //on success this will return user data from google.
        console.log("success", userData);
        Swal.fire(
          `Hi ${userData.firstName}, Authenticating with Tell Space.\n Please wait`
        );
        Swal.showLoading();

        this.getLoginToken(userData.idToken).subscribe(
          (result) => {
            Swal.fire("Login Successful", "Welcome to Tell Space", "success");
            this.setCollaboratorSession(
              result,
              userData.name,
              userData.photoUrl
            );
            this.setCollaboratorName(userData.name);
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
      },
      (err) => console.log(err) //Logs errors from Google oAuth
    );
  }

  /**GET request to the server for a collaborator token
   * @param googleID valid token Id returned from google
   */
  private getLoginToken(googleId: string): Observable<Tokens> {
    const url = `${this.rootUrl}/${googleId}`;
    return this.http.get<Tokens>(url);
  }

  private logoutFromServer(): Observable<any> {
    const url = `${this.rootUrl}/logout`;
    return this.http.delete(url);
  }

  private setCollaboratorSession(
    token: Tokens,
    name: string,
    photoUrl: string
  ) {
    localStorage.setItem("collaborator_name", name);
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("refresh_token", token.refresh_token);
    localStorage.setItem("access_expiration", token.access_expiration);
    localStorage.setItem("refresh_expiration", token.refresh_expiration);
    localStorage.setItem("photo_url", photoUrl);
  }

  logout(): void {
    this.logoutFromServer().subscribe((result) => {
      localStorage.removeItem("collaborator_name");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_expiration");
      localStorage.removeItem("refresh_expiration");
      localStorage.removeItem("photo_url");
      this.socialAuthService.signOut();
      this.router.navigateByUrl("login");
      Swal.fire("Logout Successful", "Goodbye", "success");
    });
  }

  public isLoggedIn(): boolean {
    let expireBy = localStorage.getItem("access_expiration");
    return new Date() < new Date(expireBy);
  }

  public getCollaboratorName(): Observable<string> {
    return this.collaborator_name$;
  }

  private setCollaboratorName(name: string) {
    this.collaborator_source.next(name);
  }

  public getCollaboratorProfile(): Observable<Profile> {
    //const url = `${this.rootUrl}/me`;
    //return this.http.get<Profile>(url);
    return of({
      first_name: localStorage.getItem("collaborator_name"),
      last_name: "",
      email: "TestEmail",
      faculty: "TestFaculty",
    } as Profile);
  }
}
