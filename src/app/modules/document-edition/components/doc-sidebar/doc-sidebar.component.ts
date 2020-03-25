import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ContentSection } from "@app/models/content-section";

@Component({
  selector: "app-doc-sidebar",
  templateUrl: "./doc-sidebar.component.html",
  styleUrls: ["./doc-sidebar.component.scss"]
})
export class DocSidebarComponent {
  constructor(private router: Router) {}

  @Input() docTitle: string;

  @Input() docID: string;

  @Input() sections: ContentSection[];

  @Output() removed = new EventEmitter<string>();

  @Output() added = new EventEmitter<any>();

  public removeSection(sectionID: string): void {
    this.removed.emit(sectionID);
  }

  public addSection(): void {
    this.added.emit();
  }

  public navigateToCaseStudyRoot(): void {
    this.router.navigateByUrl(`/edit/${this.docID}`);
  }
}
