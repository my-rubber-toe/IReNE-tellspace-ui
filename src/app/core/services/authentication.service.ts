import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Tokens } from "@app/models/tokens";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private rootUrl = "api/tellspace/auth"; // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private collaborator_source: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem("collaborator_name") || ""
  );

  private collaborator_name$: Observable<
    string
  > = this.collaborator_source.asObservable();

  constructor(
    private socialAuthService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  public signin() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

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
            this.setCollaboratorSession(result, userData.name);
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
      (err) => console.log(err)
    );
  }

  private getLoginToken(googleId: string): Observable<Tokens> {
    const url = `${this.rootUrl}/${googleId}`;
    return this.http.get<Tokens>(url);
  }

  private logoutFromServer(): Observable<any> {
    const url = `${this.rootUrl}/logout`;
    return this.http.delete(url);
  }

  private setCollaboratorSession(token: Tokens, name: string) {
    localStorage.setItem("collaborator_name", name);
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("refresh_token", token.refresh_token);
    localStorage.setItem("access_expiration", token.access_expiration);
    localStorage.setItem("refresh_expiration", token.refresh_expiration);
  }

  logout(): void {
    this.logoutFromServer().subscribe((result) => {
      localStorage.removeItem("collaborator_name");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_expiration");
      localStorage.removeItem("refresh_expiration");
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
}
