import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ContentSection } from "@app/models/content-section";
import { DocumentEditionService } from "@app/core/services/document-edition.service";
import { CaseDocument } from "@app/models/case-document";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-section-editor",
  templateUrl: "./section-editor.component.html",
  styleUrls: ["./section-editor.component.scss"]
})
export class SectionEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    private editService: DocumentEditionService,
    private route: ActivatedRoute
  ) {}

  activeDoc$: Observable<CaseDocument>;
  activeDoc: CaseDocument;
  activeSection: number;

  ngOnInit(): void {
    this.activeDoc$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.activeSection = +params.get("secid");
        return this.editService.getDocumentStream();
      })
    );

    this.activeDoc$.subscribe(res => (this.activeDoc = res));
  }
}
