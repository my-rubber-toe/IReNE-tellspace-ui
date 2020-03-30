import {
  Component,
  OnInit,
} from "@angular/core";

import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl } from "@angular/forms";
import * as ClassicEditorWithAutosave from "@app/../assets/ckeditor.js";

@Component({
  selector: "app-section-editor",
  templateUrl: "./section-editor.component.html",
  styleUrls: ["./section-editor.component.scss"]
})
export class SectionEditorComponent implements OnInit {
  public Editor = ClassicEditorWithAutosave;

  public EditorConfig = {
    autosave: {
      // The minimum amount of time the Autosave plugin is waiting after the last data change.
      waitingTime: 5000,
      save: editor => this.saveData(editor.getData())
    }
  };

  sectionInitialData: string;
  activeSection: number;

  public model = {
    editorData: "<p>Hello, world!</p>"
  };
  title = new FormControl("");
  constructor(
    private editService: DocumentEditionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activeSection = +params.get("secid");
      this.model.editorData = `<p>This is section ${this.activeSection}</p>`;
      console.log(
        "section_editor refreshed with section number: ",
        this.activeSection
      );
    });
  }

  saveData(data: string) {
    console.log("saved", data);
  }
}
