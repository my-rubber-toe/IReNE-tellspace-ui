import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { Document } from "src/app/interfaces/document";
import { DocumentsService } from "src/app/core/services/documents.service";

@Component({
  selector: "app-new-document.dialog",
  templateUrl: "./new-document.dialog.component.html",
  styleUrls: ["./new-document.dialog.component.scss"]
})
export class NewDocumentDialogComponent {
  createDocumentForm: FormGroup;

  toppingList: string[] = [
    "Extra cheese",
    "Mushroom",
    "Onion",
    "Pepperoni",
    "Sausage",
    "Tomato"
  ];

  constructor(
    public dialogRef: MatDialogRef<NewDocumentDialogComponent>,
    public docService: DocumentsService,
    private fb: FormBuilder
  ) {
    this.createDocumentForm = this.generateDocumentCreationForm();
  }

  private generateDocumentCreationForm(): FormGroup {
    //Form Control Names correspond to field names on models.
    return this.fb.group({
      title: ["", Validators.required],
      incident_date: ["", Validators.required],
      infrastructure_type: ["", Validators.required],
      damage_type: ["", Validators.required],
      authors: this.fb.array([
        this.fb.group({
          author_FN: ["", Validators.required],
          author_LN: ["", Validators.required],
          author_email: ["", Validators.email],
          author_faculty: ["", Validators.required]
        })
      ]),
      actors: this.fb.array([
        this.fb.group({
          actor_FN: ["", Validators.required],
          actor_LN: ["", Validators.required],
          actor_role: ["", Validators.required]
        })
      ])
    });
  }

  //Form Functions
  getAuthors(): FormArray {
    return this.createDocumentForm.get("authors") as FormArray;
  }

  getActors(): FormArray {
    return this.createDocumentForm.get("actors") as FormArray;
  }
  addAuthor() {
    let authorsArray = this.getAuthors();
    let newAuthor: FormGroup = this.fb.group({
      author_FN: ["", Validators.required],
      author_LN: ["", Validators.required],
      author_email: ["", Validators.email],
      author_faculty: ["", Validators.required]
    });
    authorsArray.push(newAuthor);
  }

  addActor() {
    let actorsArray = this.getActors();
    let newActor: FormGroup = this.fb.group({
      actor_FN: ["", Validators.required],
      actor_LN: ["", Validators.required],
      actor_role: ["", Validators.required]
    });
    actorsArray.push(newActor);
  }

  removeAuthor(i: number) {
    let infrastructuresArray = this.createDocumentForm.controls
      .authors as FormArray;
    infrastructuresArray.removeAt(i);
  }

  removeActor(i: number) {
    let infrastructuresArray = this.createDocumentForm.controls
      .actors as FormArray;
    infrastructuresArray.removeAt(i);
  }

  getErrorMessage() {
    return this.createDocumentForm.hasError("required") ? "Required field" : "";
  }

  onSubmit(): void {
    //Shallow Copy of the form model
    let doc: Document = Object.assign(
      new Document(),
      this.createDocumentForm.value
    );
    //  this.docService.createDocument(doc);
    this.dialogRef.close();
  }
}
