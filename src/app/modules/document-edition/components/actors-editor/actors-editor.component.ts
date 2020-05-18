import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { Actor } from "@app/shared/models/actor";

@Component({
  selector: "app-actors-editor",
  templateUrl: "./actors-editor.component.html",
  styleUrls: ["./actors-editor.component.scss"],
})
export class ActorsEditorComponent implements OnInit {
  @Input() actors: Actor[];

  actorForm: FormGroup;

  readonly ACTORS_MIN: number = 1;
  readonly ACTORS_MAX: number = 5;

  editingActors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private edition: DocumentEditionService
  ) {}

  private initActors(): FormGroup {
    return this.fb.group(
      {
        actor_FN: ["", [Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/)]],
        actor_LN: ["", [Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/)]],
        role: ["", [Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚÑÜ][a-z A-Z : 0-9 À-ÿ]*[.]{0,1}[ ]{0,1}[a-z A-Z : 0-9 À-ÿ]*[a-zA-Z:0-9À-ÿ]$/)]],
      },
      Validators.required
    );
  }

  ngOnInit(): void {
    this.actorForm = this.fb.group(
      {
        actors: this.fb.array([], Validators.required),
      },
      Validators.required
    );

    this.actors.forEach((actor) => {
      this.addActorX(actor);
    });
  }

  addActorX(actor: Actor) {
    const control = this.actorForm.get("actors") as FormArray;
    control.push(
      this.fb.group(
        {
          actor_FN: [actor.actor_FN, [Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/)]],
          actor_LN: [actor.actor_LN, [Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/)]],
          role: [actor.role, [Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚÑÜ][a-z A-Z : 0-9 À-ÿ]*[.]{0,1}[ ]{0,1}[a-z A-Z : 0-9 À-ÿ]*[a-zA-Z:0-9À-ÿ]$/)]],
        },
        Validators.required
      )
    );
  }

  addActor() {
    const control = this.actorForm.get("actors") as FormArray;
    control.push(this.initActors());
  }

  removeActor(i: number) {
    let actorArray = this.actorForm.controls.actors as FormArray;
    actorArray.removeAt(i);
  }

  toggleEditingActors() {
    console.log(this.actorForm.status);
    this.editingActors = !this.editingActors;
  }

  saveActors() {
    console.log("Saved authors: ", this.actorForm.getRawValue());
    this.edition.editActors(this.actorForm.getRawValue());
    this.toggleEditingActors();
  }
}
