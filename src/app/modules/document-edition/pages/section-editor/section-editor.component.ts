import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ContentSection } from '@app/models/content-section';

@Component({
  selector: "app-section-editor",
  templateUrl: "./section-editor.component.html",
  styleUrls: ["./section-editor.component.scss"]
})
export class SectionEditorComponent implements OnInit {
  @Input() section : ContentSection;

  @Output() modified : EventEmitter<string>;
  
  public Editor = ClassicEditor;
  constructor() {}

  public model = {
    editorData: "<p>Hello, world!</p>"
  };

  ngOnInit(): void {}
}
