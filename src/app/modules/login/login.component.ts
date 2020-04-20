import { Component, OnInit } from "@angular/core";
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader,
} from "@angular/material/card";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/core/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(public router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {}

  public login(): void {
    console.log("login initiated");
    this.auth.signin();
  }
}
