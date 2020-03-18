import { Component, OnInit } from "@angular/core";
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader
} from "@angular/material/card";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  public login(): void {
    console.log("login initiated");
    this.router.navigateByUrl("docs");
  }
}
