import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Author } from "@app/shared/models/author";
import { DocumentEditionService } from "@app/core/services/document-edition.service";

@Component({
  selector: "app-authors-editor",
  templateUrl: "./authors-editor.component.html",
  styleUrls: ["./authors-editor.component.scss"],
})
export class AuthorsEditorComponent implements OnInit {
  @Input() authors: Author[];

  readonly AUTHORS_MIN: number = 1;
  readonly AUTHORS_MAX: number = 10;

  authorForm: FormGroup;

  editingAuthors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private edition: DocumentEditionService
  ) {}

  private initAuthors(): FormGroup {
    return this.fb.group(
      {
        author_FN: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/
            ),
          ],
        ],
        author_LN: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/
            ),
          ],
        ],
        author_email: ["", Validators.pattern("^[a-z0-9._%+-]+@upr.edu$")],
        author_faculty: [
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
    this.authorForm = this.fb.group(
      {
        authors: this.fb.array([], Validators.required),
      },
      Validators.required
    );

    this.authors.forEach((author) => {
      this.addAuthorX(author);
    });
  }

  addAuthorX(author: Author) {
    const control = this.authorForm.get("authors") as FormArray;
    control.push(
      this.fb.group(
        {
          author_FN: [
            author.author_FN,
            [
              Validators.required,
              Validators.pattern(
                /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/
              ),
            ],
          ],
          author_LN: [
            author.author_LN,
            [
              Validators.required,
              Validators.pattern(
                /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z À-ÿ]*(-){0,1}[a-z A-Z À-ÿ]*[a-záéíóúñü]$/
              ),
            ],
          ],
          author_email: [
            author.author_email,
            Validators.pattern("^[a-z0-9._%+-]+@upr.edu$"),
          ],
          author_faculty: [
            author.author_faculty,
            [
              Validators.required,
              Validators.pattern(
                /^[A-ZÁÉÍÓÚÑÜ][a-z A-Z : 0-9 À-ÿ]*[.]{0,1}[ ]{0,1}[a-z A-Z : 0-9 À-ÿ]*[a-zA-Z:0-9À-ÿ]$/
              ),
            ],
          ],
        },
        Validators.required
      )
    );
  }

  addAuthor() {
    const control = this.authorForm.get("authors") as FormArray;
    control.push(this.initAuthors());
  }

  removeAuthor(i: number) {
    let authorArray = this.authorForm.controls.authors as FormArray;
    authorArray.removeAt(i);
  }

  toggleEditingAuthors() {
    this.editingAuthors = !this.editingAuthors;
  }

  saveAuthors() {
    this.edition.editAuthors(this.authorForm.getRawValue());
    this.toggleEditingAuthors();
  }

  getEmailErrorMessage() {
    return "Valid @upr.edu email required";
  }
}
