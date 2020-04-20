import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-core",
  templateUrl: "./core.component.html",
  styleUrls: ["./core.component.scss"],
})
export class CoreComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //Basis to alert the user when offline and act accordingly
    window.addEventListener("offline", (e) => console.log(e, "you're offline"));
  }
}
