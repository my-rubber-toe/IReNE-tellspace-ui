import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

/**Manages the edition of case document descriptions. Reactive Form*/
@Component({
  selector: "app-description-editor",
  templateUrl: "./description-editor.component.html",
  styleUrls: ["./description-editor.component.scss"]
})
export class DescriptionEditorComponent implements OnInit {
  constructor() {}

  @Input() description: string;

  isNotEditing: boolean = true;

  descriptionFormControl: FormControl = new FormControl([""]);

  ngOnInit(): void {
    this.descriptionFormControl.setValue(this.description);
  }

  editDescriptionToggle() {
    this.isNotEditing = !this.isNotEditing;
  }

  save() {
    console.log("saved description: ", this.descriptionFormControl.value);
    this.editDescriptionToggle();
  }
}
