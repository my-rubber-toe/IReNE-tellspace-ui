import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as ClassicEditorWithAutosave from "@app/../assets/ckeditor.js";
import { debounceTime } from "rxjs/operators";
import { ContentSection } from "@app/shared/models/content-section";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import Swal from "sweetalert2";
import { BehaviorSubject } from "rxjs";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
/**Component that handles the section edition editor and implements CKEditor*/
@Component({
  selector: "app-section-editor",
  templateUrl: "./section-editor.component.html",
  styleUrls: ["./section-editor.component.scss"],
})
export class SectionEditorComponent implements OnInit {
  /**Constant for the time to wait before sending an update request upon modification of title or text content. */
  public static readonly DEBOUNCE_TIME: number = 3000; //275; //This debounce is for user interface, service has another for server

  public Editor = ClassicEditorWithAutosave;

  public EditorConfig = {
    autosave: {
      // The minimum amount of time the Autosave plugin is waiting after the last data change.
      waitingTime: SectionEditorComponent.DEBOUNCE_TIME,
      save: (editor) => this.saveData(editor.getData()),
    },
  };

  sectionInitialData: string;

  activeSection: number;

  savedFlag: BehaviorSubject<boolean> = new BehaviorSubject(true);

  isSaved: boolean;

  public model = {
    editorData: "<p>Hello, world!</p>",
  };

  titleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private editService: DocumentEditionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.savedFlag.subscribe((flag) => (this.isSaved = flag));

    this.titleForm = this.fb.group({ title: ["", Validators.required] });

    this.route.paramMap.subscribe((params) => {
      //<--Initial Data Loading executed when url changes to a section.
      this.activeSection = +params.get("secid");
      console.log(
        "section_editor refreshed with section number: ",
        this.activeSection
      );

      const section = this.editService.getActiveSection(this.activeSection);
      if (section != null) {
        //<--If section exists in the active document set data on view editors.
        this.model.editorData = section.content
          ? section.content
          : "";
        this.titleForm.setValue({ title: section.secTitle});
      } else {
        this.router.navigateByUrl("invalid"); //<--Section number does not exist in the active case document, redirects to invalid.
      }
    });

    this.titleForm.valueChanges
      .pipe(debounceTime(SectionEditorComponent.DEBOUNCE_TIME))
      .subscribe((value) => {
        if (this.titleForm.valid) {
          const statusIndicator = document.querySelector(
            "#snippet-autosave-status"
          );
          statusIndicator.classList.add("busy");
          this.isSaved = false;
          this.uploadData();
        }
      });
  }

  setSectionEditorFlag(){

  }

  onEditorChange({ editor }: ChangeEvent) {
    this.isSaved = false;
    const statusIndicator = document.querySelector("#snippet-autosave-status");
    statusIndicator.classList.add("busy");
  }

  saveData(data: string) {
    console.log("saved", data);
    this.uploadData();
  }

  uploadData() {
    this.editService
      .editSection(
        new ContentSection(this.titleForm.value.title, this.model.editorData),
        this.activeSection
      )
      .subscribe((res) => {
        console.log(this.isSaved);
        const statusIndicator = document.querySelector(
          "#snippet-autosave-status"
        );
        this.isSaved = true;
        statusIndicator.classList.remove("busy");
      });
  }

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
