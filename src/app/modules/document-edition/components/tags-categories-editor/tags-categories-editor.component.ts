import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { FormControl, Validators } from "@angular/forms";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Observable } from "rxjs";
import { DocumentsService } from "@app/core/services/documents.service";
import { Category } from "@app/shared/models/category";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-tags-categories-editor",
  templateUrl: "./tags-categories-editor.component.html",
  styleUrls: ["./tags-categories-editor.component.scss"],
})
export class TagsCategoriesEditorComponent implements OnInit {
  @Input() tags: string[];
  @Input() infrastructures: string[];
  @Input() damage_types: string[];
  infrastructureList: string[];
  damageList: string[];
  filteredTagList: Observable<string[]>;

  alltags: string[] = [""];

  editingTags: boolean;
  editingInfrastructures: boolean;
  editingDamages: boolean;

  tagsFormControl: FormControl = new FormControl([
    "",
    Validators.nullValidator,
  ]);
  infrastructuresFormControl: FormControl = new FormControl(
    [""],
    Validators.required
  );
  damagesFormControl: FormControl = new FormControl([""], Validators.required);

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild("tagInput") tagInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor(
    private edition: DocumentEditionService,
    private docService: DocumentsService
  ) {
    this.filteredTagList = this.tagsFormControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.alltags.slice()
      )
    );
  }

  ngOnInit(): void {
    this.docService.getTags().subscribe((res) => {console.log("res", res);this.alltags = res});
    this.docService
      .getDamageTypes()
      .subscribe((res) => (this.damageList = res));
    this.docService
      .getInfrastructureTypes()
      .subscribe((res) => (this.infrastructureList = res));
  }

  toggleTagsEditor() {
    this.editingTags = !this.editingTags;
  }

  saveTags() {
    console.log("saved tags: ", this.tags);
    this.edition.editTags(this.tags);
    this.toggleTagsEditor();
  }

  toggleInfrastructuresEditor() {
    if (!this.editingInfrastructures)
      this.infrastructuresFormControl.setValue(this.infrastructures);
    this.editingInfrastructures = !this.editingInfrastructures;
  }

  saveinfrastructures() {
    console.log(
      "saved infrastructures: ",
      this.infrastructuresFormControl.value
    );
    this.edition.editInfraestructureTypes(
      this.infrastructuresFormControl.value
    );
    this.toggleInfrastructuresEditor();
  }

  toggleDamagesEditor() {
    if (!this.editingDamages)
      this.damagesFormControl.setValue(this.damage_types);
    this.editingDamages = !this.editingDamages;
  }

  saveDamages() {
    console.log("saved damage types: ", this.damagesFormControl.value);
    this.edition.editDamageTypes(this.damagesFormControl.value);
    this.toggleDamagesEditor();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tags
    if ((value || "").trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.tagsFormControl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = "";
    this.tagsFormControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
