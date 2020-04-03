import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-locations-editor",
  templateUrl: "./locations-editor.component.html",
  styleUrls: ["./locations-editor.component.scss"]
})
export class LocationsEditorComponent implements OnInit {
  @Input() locations: string[];

  editingLocations: boolean;

  locationsControl: FormControl = new FormControl([
    "",
    Validators.nullValidator
  ]);

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];

  constructor(private edition: DocumentEditionService) {}

  ngOnInit(): void {
    this.locationsControl.setValue(null);
  }

  toggleLocationsEditor() {
    this.editingLocations = !this.editingLocations;
  }

  saveLocations() {
    console.log("saved locations: ", this.locations);
    this.edition.editLocations(this.locations);
    this.toggleLocationsEditor();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tags
    if ((value || "").trim()) {
      this.locations.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.locationsControl.setValue(null);
  }

  remove(location: string): void {
    const index = this.locations.indexOf(location);

    if (index >= 0) {
      this.locations.splice(index, 1);
    }
  }
}
