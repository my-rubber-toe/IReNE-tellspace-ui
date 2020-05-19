import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { PUERTO_RICO_TOWNS } from "./puerto-rico-town-list";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-locations-editor",
  templateUrl: "./locations-editor.component.html",
  styleUrls: ["./locations-editor.component.scss"],
})
export class LocationsEditorComponent implements OnInit {
  @Input() locations: string[];

  towns = PUERTO_RICO_TOWNS;

  readonly MAX_LOCATIONS_LENGTH = 5;

  filteredLocationsList: Observable<string[]>;

  editingLocations: boolean;

  locationsControl: FormControl = new FormControl([
    "",
    Validators.nullValidator,
  ]);

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];

  @ViewChild("tagInput") tagInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor(private edition: DocumentEditionService) {
    this.filteredLocationsList = this.locationsControl.valueChanges.pipe(
      startWith(null),
      map((local: string | null) =>
        local ? this._filter(local) : this.towns.slice()
      )
    );
  }

  ngOnInit(): void {
    this.locationsControl.setValue(this.locations);
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

    // Add locations
    if ((value || "").trim()) {
      let local = value.trim();
      //if location is unique then add
      if (
        this.towns.indexOf(local) != -1 &&
        this.locations.indexOf(local) == -1 &&
        this.locations.length < this.MAX_LOCATIONS_LENGTH
      ) {
        this.locations.push(local);
      }
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.locationsControl.setValue(null);
  }

  remove(local: string): void {
    const index = this.locations.indexOf(local);

    if (index >= 0) {
      this.locations.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let newTag = event.option.viewValue;
    //if tag is unique then add
    if (
      this.locations.indexOf(newTag) == -1 &&
      this.locations.length < this.MAX_LOCATIONS_LENGTH
    ) {
      this.locations.push(newTag);
    }
    this.tagInput.nativeElement.value = "";
    this.locationsControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.towns.filter(
      (locals) => locals.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
