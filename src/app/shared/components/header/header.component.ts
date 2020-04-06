import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/core/services/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {}

  public navigateToDashBoard(): void {
    this.router.navigateByUrl("/docs");
  }

  public logout(): void {
    this.auth.logout();
  }
}
