import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/core/services/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  collaborator_name: string = "";
  constructor(public router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth
      .getCollaboratorName()
      .subscribe((name) => (this.collaborator_name = name));
  }

  public navigateToDashBoard(): void {
    this.router.navigateByUrl("/docs");
  }

  public logout(): void {
    this.auth.logout();
  }

  public navigateToProfile(): void {
    this.router.navigateByUrl("/me");
  }
}
