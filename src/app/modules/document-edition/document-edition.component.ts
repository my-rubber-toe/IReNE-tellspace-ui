import { Component, OnInit } from "@angular/core";
import { DocumentsService } from "@app/core/services/documents.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Document } from "@app/models/document";
import { ContentSection } from "@app/models/content-section";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: "app-document-edition",
  templateUrl: "./document-edition.component.html",
  styleUrls: ["./document-edition.component.scss"]
})
export class DocumentEditionComponent implements OnInit {
  public isSaving: boolean;

  constructor(
    private router: Router,
    private docService: DocumentsService,
    private route: ActivatedRoute
  ) {}

  caseDocument: Document;

  ngOnInit(): void {
    this.route.data.subscribe((data: { caseDocument: Document }) => {
      console.log(data.caseDocument);
      this.caseDocument = data.caseDocument;
    });
  }

  onRemoved(id: string) {
    this.docService.removeSection(id).subscribe();
  }

  onAdded() {
    this.docService.createSection().subscribe(x => {
      this.caseDocument.section.push(new ContentSection(x, "Untitled"));
    });
  }
}
