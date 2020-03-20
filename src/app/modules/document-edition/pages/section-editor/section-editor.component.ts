import { Component, OnInit } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-section-editor",
  templateUrl: "./section-editor.component.html",
  styleUrls: ["./section-editor.component.scss"]
})
export class SectionEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor() {}

  public model = {
    editorData: "<p>Hello, world!</p>"
  };

  ngOnInit(): void {}
}
