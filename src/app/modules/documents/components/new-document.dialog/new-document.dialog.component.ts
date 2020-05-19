import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";

import { DocumentsService } from "@app/core/services/documents.service";
import { DirtyStateErrorMatcher } from "@app/shared/dirty-state-error.matcher";
import { DatePipe } from "@angular/common";
import { CaseDocumentCreateRequest } from "@app/shared/models/case-document-create-request";

@Component({
  selector: "app-new-document.dialog",
  templateUrl: "./new-document.dialog.component.html",
  styleUrls: ["./new-document.dialog.component.scss"],
})
export class NewDocumentDialogComponent implements OnInit {
  createDocumentForm: FormGroup;
  maxDate: Date;
  minDate: Date;

  readonly AUTHORS_MAX: number = 10;
  readonly ACTORS_MAX: number = 5;

  public infrastructureList: string[] = ["infraestructure"];
  public damageTypeList: string[] = ["damage_type"];

  public matcher = new DirtyStateErrorMatcher();

  constructor(
    public dialogRef: MatDialogRef<NewDocumentDialogComponent>,
    public docService: DocumentsService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    // Set minimum and maximun dates
    this.maxDate = new Date();
    this.minDate = new Date(1493, 11, 19); //Set minimum aceptable date as the discovery of Puerto Rico
  }

  private initAuthors(): FormGroup {
    return this.fb.group(
      {
        first_name: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/
            ),
          ],
        ],
        last_name: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/
            ),
          ],
        ],
        email: ["", Validators.pattern("^[a-z0-9._%+-]+@upr\\.edu$")],
        faculty: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z : 0-9 À-ÿ]*[.]{0,1}[ ]{0,1}[a-z A-Z : 0-9 À-ÿ]*[a-zA-Z:0-9À-ÿ]$/
            ),
          ],
        ],
      },
      Validators.required
    );
  }

  private initActors(): FormGroup {
    return this.fb.group(
      {
        first_name: ["", [Validators.required]],
        last_name: ["", [Validators.nullValidator]],
        role: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z : 0-9 À-ÿ]*[.]{0,1}[ ]{0,1}[a-z A-Z : 0-9 À-ÿ]*[a-zA-Z:0-9À-ÿ]$/
            ),
          ],
        ],
      },
      Validators.required
    );
  }

  ngOnInit(): void {
    this.docService
      .getInfrastructureTypes()
      .subscribe((types) => (this.infrastructureList = types));
    this.docService
      .getDamageTypes()
      .subscribe((types) => (this.damageTypeList = types));

    this.createDocumentForm = this.fb.group(
      {
        title: [
          "",
          Validators.pattern(
            /^[A-ZÁÉÍÓÚÑÜ][A-Z a-z 0-9 À-ÿ :]*[A-Za-z0-9À-ÿ]$/
          ),
        ],
        language: ["English", Validators.required],
        incident_date: ["", Validators.required],
        infrastructure_type: ["", Validators.required],
        damage_type: ["", Validators.required],
        authors: this.fb.array([this.initAuthors()]),
        actors: this.fb.array([this.initActors()]),
      },
      Validators.required
    );
  }

  addAuthor() {
    const control = this.createDocumentForm.get("authors") as FormArray;
    control.push(this.initAuthors());
  }

  removeAuthor(i: number) {
    let authorArray = this.createDocumentForm.controls.authors as FormArray;
    authorArray.removeAt(i);
  }

  addActor() {
    const control = this.createDocumentForm.get("actors") as FormArray;
    control.push(this.initActors());
  }

  removeActor(i: number) {
    let actorArray = this.createDocumentForm.controls.actors as FormArray;
    actorArray.removeAt(i);
  }

  private createRequestObject(): CaseDocumentCreateRequest {
    const formValue = this.createDocumentForm.getRawValue();
    return {
      title: formValue.title,
      incident_date: this.datePipe.transform(
        formValue.incident_date,
        "yyyy-MM-dd"
      ),
      actors: formValue.actors,
      authors: formValue.authors,
      damage_type: formValue.damage_type,
      infrastructure_type: formValue.infrastructure_type,
      language: formValue.language,
    };
  }

  onSubmit(): void {
    this.dialogRef.close(this.createRequestObject());
  }

  cancelAndClose(): void {
    this.dialogRef.close();
  }

  getEmailErrorMessage() {
    return "Valid @upr.edu email required";
  }
}
