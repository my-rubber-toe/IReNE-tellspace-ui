import { Component, OnInit, Input } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { PUERTO_RICO_TOWNS } from "./puerto-rico-town-list";

@Component({
  selector: "app-locations-editor",
  templateUrl: "./locations-editor.component.html",
  styleUrls: ["./locations-editor.component.scss"],
})
export class LocationsEditorComponent implements OnInit {
  @Input() locations: string[];

  towns = PUERTO_RICO_TOWNS;

  editingLocations: boolean;

  locationsControl: FormControl = new FormControl([
    "",
    Validators.nullValidator,
  ]);

  constructor(private edition: DocumentEditionService) {}

  ngOnInit(): void {
    this.locationsControl.setValue(this.locations);
  }

  toggleLocationsEditor() {
    this.editingLocations = !this.editingLocations;
  }

  saveLocations() {
    console.log("saved locations: ", this.locationsControl.value);
    this.locations = this.locationsControl.value;
    this.edition.editLocations(this.locationsControl.value);
    this.toggleLocationsEditor();
  }
}
