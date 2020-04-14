import { Component, OnInit } from "@angular/core";
import { Profile } from "@app/shared/models/profile";
import { AuthenticationService } from "@app/core/services/authentication.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  imageUrl: string = "";

  profile: Profile = {
    first_name: "",
    last_name: "",
    email: "",
    faculty: "",
  };

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    let imageUrl = localStorage.getItem("photo_url");
    if (imageUrl) this.imageUrl = imageUrl;
    this.auth
      .getCollaboratorProfile()
      .subscribe((profile) => (this.profile = profile));
  }
}
