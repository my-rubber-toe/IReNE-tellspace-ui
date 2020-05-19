/**Description Editor
 * @author Alberto Canela(alberto.canela@upr.edu)
 */
import { Component, OnInit, Input } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DocumentEditionService } from "@app/core/services/document-edition.service";

/**Manages the edition of case document descriptions. Reactive Form*/
@Component({
  selector: "app-description-editor",
  templateUrl: "./description-editor.component.html",
  styleUrls: ["./description-editor.component.scss"],
})
export class DescriptionEditorComponent implements OnInit {
  constructor(private edition: DocumentEditionService) {
    this.descriptionFormControl = new FormControl(
      "",
      Validators.maxLength(500)
    );
  }

  /**The description of this case study */
  @Input() description: string;

  /**Flags if the description view is not on a editing state */
  isNotEditing: boolean = true;

  /**Flags if a save operation is being executed on this description editor */
  isSaving: boolean = false;

  /**Reference to the description editor form control */
  descriptionFormControl: FormControl;

  /**Life cycle function: on component init sets description on form */
  ngOnInit(): void {
    this.descriptionFormControl.setValue(this.description);
  }

  /**Toggles editing state of the description editor */
  editDescriptionToggle() {
    this.isNotEditing = !this.isNotEditing;
  }

  /**Saves the current state of the description editor to the server */
  save() {
    this.isSaving = true;
    let trimmedDescription = (this.descriptionFormControl
      .value as string).trim();
    this.descriptionFormControl.setValue(trimmedDescription);
    this.edition.editDescription(trimmedDescription).subscribe(
      (result) => {
        this.isSaving = false;
        this.editDescriptionToggle();
      },
      (error) => (this.isSaving = false)
    );
  }

  /**Calls function that opens a preview of the case study on search space on a new tab */
  previewOnSearchSpace() {
    this.edition.previewDocumentOnSearchSpace();
  }
}
