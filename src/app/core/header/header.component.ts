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
  imageUrl = "";
  constructor(public router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth
      .getCollaboratorName()
      .subscribe((name) => (this.collaborator_name = name));
    let imageUrl = localStorage.getItem("photo_url");
    if (imageUrl) this.imageUrl = imageUrl;
  }

  public navigateToDashBoard(): void {
    this.router.navigateByUrl("/docs");
  }

  public logout(): void {
    this.auth.logout();
  }

  public navigateToProfile(): void {
    this.router.navigateByUrl("/profile");
  }
}
