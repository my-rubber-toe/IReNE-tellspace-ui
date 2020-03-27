import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { CaseDocument } from "@app/models/case-document";
import { DocumentsService } from "@app/core/services/documents.service";

@Component({
  selector: "app-new-document.dialog",
  templateUrl: "./new-document.dialog.component.html",
  styleUrls: ["./new-document.dialog.component.scss"]
})
export class NewDocumentDialogComponent implements OnInit {
  @Output() submited = new EventEmitter<boolean>();

  createDocumentForm: FormGroup;

  public infrastructureList: string[] = ["infraestructure"];
  public damageTypeList: string[] = ["damage_type"];

  constructor(
    public dialogRef: MatDialogRef<NewDocumentDialogComponent>,
    public docService: DocumentsService,
    private fb: FormBuilder
  ) {
    this.createDocumentForm = this.generateDocumentCreationForm();
  }

  ngOnInit(): void {
    this.docService
      .getInfrastructureTypes()
      .subscribe(types => (this.infrastructureList = types.categories));
    this.docService
      .getDamageTypes()
      .subscribe(types => (this.damageTypeList = types.categories));
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
        }),
        Validators.required
      ]),
      actors: this.fb.array(
        [
          this.fb.group({
            actor_FN: ["", Validators.required],
            actor_LN: ["", Validators.required],
            actor_role: ["", Validators.required]
          })
        ],
        Validators.required
      )
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
    let doc: CaseDocument = Object.assign(
      new CaseDocument(),
      this.createDocumentForm.value
    );
    this.docService.createDocument(doc).subscribe();
    this.dialogRef.close(true);
  }
}
