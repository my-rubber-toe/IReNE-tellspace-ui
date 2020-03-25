import { Component, OnInit } from "@angular/core";
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader
} from "@angular/material/card";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(public router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  public login(): void {
    console.log("login initiated");
    this.auth.login().subscribe(valid => {
      if (valid) {
        this.router.navigateByUrl("docs");
      } else {
        alert("Unauthorized account");
      }
    });
  }
}
