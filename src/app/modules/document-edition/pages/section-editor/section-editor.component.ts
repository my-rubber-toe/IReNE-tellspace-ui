import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as ClassicEditorWithAutosave from "@app/../assets/ckeditor.js";
import { debounceTime } from "rxjs/operators";
import { ContentSection } from "@app/shared/models/content-section";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import Swal from "sweetalert2";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "@app/core/services/authentication.service";
/**Component that handles the section edition editor and implements CKEditor*/
@Component({
  selector: "app-section-editor",
  templateUrl: "./section-editor.component.html",
  styleUrls: ["./section-editor.component.scss"],
})
export class SectionEditorComponent implements OnInit {
  /**Constant for the time to wait before sending an update request upon modification of title or text content. */
  public static readonly DEBOUNCE_TIME: number = 2000;

  /**The ckeditor build used in this component */
  public Editor = ClassicEditorWithAutosave;

  /**The ck editor configuration */
  public EditorConfig = {
    autosave: {
      // The minimum amount of time the Autosave plugin is waiting after the last data change.
      waitingTime: SectionEditorComponent.DEBOUNCE_TIME,
      save: (editor) => this.saveData(editor.getData()),
    },
    toolbar: {
      viewportTopOffset: 70, // viewport offset is needed for sticky toolbar to work
    },
  };

  /**The section position number of the current section open for edition */
  activeSection: number;

  /**Stores save status of the current section open for edition */
  isSaved: boolean;

  /**Loading flag as semaphore, used to now when loading has ended and save requests can go thru.
   * Done as number instead of boolean, because quick section changess trigger loading faster than debounce time,
   * and the false trigger could happen before the last opened section is loaded completly.
   */
  loading: number = 0;

  /**Model that stores the current contents of the section and is entangled with the view */
  public model = {
    editorData: "<p>Hello, world!</p>",
  };

  /**Form group that stores the controller for the section title */
  titleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private editService: DocumentEditionService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    //Initialize title form controller
    this.titleForm = this.fb.group({
      title: [
        "",
        [
          Validators.pattern(
            /^[A-ZÁÉÍÓÚÑÜ][A-Z a-z 0-9 À-ÿ :]*[A-Za-z0-9À-ÿ]$/
          ),
          Validators.maxLength(50),
        ],
      ],
    });

    //Subscribe to section changes on url, and load corresponding contents
    this.route.paramMap.subscribe((params) => {
      this.loading++; //Set loading to a truthy state
      this.setSaveStatusTrue(); //On change save status must display saved
      this.activeSection = +params.get("secid");
      this.loadSectionData();
    });

    //Subscribe to title form changes
    this.titleForm.valueChanges
      .pipe(debounceTime(SectionEditorComponent.DEBOUNCE_TIME))
      .subscribe((value) => {
        if (this.titleForm.valid && !this.loading) {
          this.setSaveStatusFalse();
          this.uploadData();
        }
      });
  }

  /**Loads the current active section from the document editing service active document */
  private loadSectionData() {
    const section = this.editService.getActiveSection(this.activeSection);
    if (section != null) {
      //<--If section exists in the active document set data on view editors.
      this.model.editorData = section.content ? section.content : "";
      this.titleForm.setValue({ title: section.secTitle });
      //Wait at least debounce time to start allowing put requests
      setTimeout(() => {
        this.loading--; //last load should set loading to a falsy state (0).
      }, SectionEditorComponent.DEBOUNCE_TIME + 10);
    } else {
      this.router.navigateByUrl("invalid"); //<--Section number does not exist in the active case document, redirects to invalid.
    }
  }

  /**Sets this component save status as true, updating UI indicator*/
  private setSaveStatusTrue() {
    this.isSaved = true;
    const statusIndicator = document.querySelector("#snippet-autosave-status");
    statusIndicator.classList.remove("busy");
  }

  /**Sets this component save status as false, updating UI indicator*/
  private setSaveStatusFalse() {
    const statusIndicator = document.querySelector("#snippet-autosave-status");
    statusIndicator.classList.add("busy");
    this.isSaved = false;
  }

  /**Callback function for change on editor, runs inmediatly on change without waiting for debounce
   * Used to set the component state as unsaved.
   */
  onEditorChange({ editor }: ChangeEvent) {
    if (!this.loading) {
      this.setSaveStatusFalse();
    }
  }

  /**Callback function to save the data currently on the editor. Runs if loading is on a falsy state */
  saveData(data: string) {
    if (!this.loading) {
      this.uploadData();
    }
  }

  /**Function that requests the edition service to update the contents of the active section and update changes to the server*/
  uploadData() {
    if (!this.loading) {
      this.editService
        .editSection(
          new ContentSection(this.titleForm.value.title, this.model.editorData),
          this.activeSection
        )
        .subscribe(
          (response) => {
            this.setSaveStatusTrue();
          },
          (error: HttpErrorResponse) => {
            /**If the error was caused because the server document space was exceeded,
               return the content model to the state before the request*/
            if (error.status == 503) {
              this.loadSectionData(); //Reload last sucessfully saved data
            } else {
              Swal.fire({
                title: "Server is not responding",
                text: "Do you want to retry saving or exit the application?",
                icon: "error",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "black",
                cancelButtonText: "Try Again",
                confirmButtonText: "Exit TellSpace",
                allowOutsideClick: false,
              }).then((result) => {
                this.setSaveStatusTrue();
                if (result.value) {
                  //If user chooses to exit, logout from the application
                  this.auth.logout();
                } else {
                  //Retry the last save request
                  this.uploadData();
                }
              });
            }
            this.setSaveStatusTrue();
          }
        );
    }
  }

  /**Function that removes a section after comfirmation from the user */
  deleteSection() {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "black",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl(
          `edit/${this.editService.getActiveDocumentID()}`
        );
        this.editService.removeSection(this.activeSection);
      }
    });
  }
}
