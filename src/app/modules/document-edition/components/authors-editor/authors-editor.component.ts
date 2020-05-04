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
        author_FN: ["", Validators.required],
        author_LN: ["", Validators.required],
        author_email: ["", Validators.pattern("^[a-z0-9._%+-]+@upr.edu$")],
        author_faculty: ["", Validators.required],
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

    console.log(this.authorForm.status);

    this.authors.forEach((author) => {
      this.addAuthorX(author);
    });
    console.log(this.authorForm.status);
  }

  addAuthorX(author: Author) {
    const control = this.authorForm.get("authors") as FormArray;
    control.push(
      this.fb.group(
        {
          author_FN: [author.author_FN, Validators.required],
          author_LN: [author.author_LN, Validators.required],
          author_email: [
            author.author_email,
            Validators.pattern("^[a-z0-9._%+-]+@upr.edu$"),
          ],
          author_faculty: [author.author_faculty, Validators.required],
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
    console.log(this.authorForm.status);
    this.editingAuthors = !this.editingAuthors;
  }

  saveAuthors() {
    console.log("Saved authors: ", this.authorForm.getRawValue());
    this.edition.editAuthors(this.authorForm.getRawValue());
    this.toggleEditingAuthors();
  }

  getEmailErrorMessage() {
    return "Valid @upr.edu email required";
  }
}
