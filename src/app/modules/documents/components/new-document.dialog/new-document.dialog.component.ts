import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormGroupName
} from "@angular/forms";

import { DocumentsService } from "@app/core/services/documents.service";

@Component({
  selector: "app-new-document.dialog",
  templateUrl: "./new-document.dialog.component.html",
  styleUrls: ["./new-document.dialog.component.scss"]
})
export class NewDocumentDialogComponent implements OnInit {
  createDocumentForm: FormGroup;
  metadata: FormGroupName;

  public infrastructureList: string[] = ["infraestructure"];
  public damageTypeList: string[] = ["damage_type"];

  constructor(
    public dialogRef: MatDialogRef<NewDocumentDialogComponent>,
    public docService: DocumentsService,
    private fb: FormBuilder
  ) {}

  private initAuthors(): FormGroup {
    return this.fb.group({
      author_FN: ["", Validators.required],
      author_LN: ["", Validators.required],
      author_email: ["", Validators.email],
      author_faculty: ["", Validators.required]
    });
  }

  private initActors(): FormGroup {
    return this.fb.group({
      actor_FN: ["", Validators.required],
      actor_LN: ["", Validators.required],
      actor_role: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.docService
      .getInfrastructureTypes()
      .subscribe(types => (this.infrastructureList = types.categories));
    this.docService
      .getDamageTypes()
      .subscribe(types => (this.damageTypeList = types.categories));

    this.createDocumentForm = this.fb.group({
      title: ["", Validators.required],
      incident_date: ["", Validators.required],
      infrastructure_type: ["", Validators.required],
      damage_type: ["", Validators.required],
      authors: this.fb.array([this.initAuthors()]),
      actors: this.fb.array([this.initActors()])
    });
  }

  addAuthor() {
    const control = this.createDocumentForm.get("authors")[
      "controls"
    ] as FormArray;
    control.push(this.initAuthors());
  }

  removeAuthor(i: number) {
    let authorArray = this.createDocumentForm.controls.authors as FormArray;
    authorArray.removeAt(i);
  }

  addActor() {
    const control = this.createDocumentForm.get("actors")[
      "controls"
    ] as FormArray;
    control.push(this.initActors());
  }

  removeActor(i: number) {
    let actorArray = this.createDocumentForm.controls.actors as FormArray;
    actorArray.removeAt(i);
  }

  onSubmit(): void {
    this.dialogRef.close(this.createDocumentForm.getRawValue());
  }
}
