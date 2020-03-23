import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Document } from "@app/models/document";

@Component({
  selector: "app-doc-sidebar",
  templateUrl: "./doc-sidebar.component.html",
  styleUrls: ["./doc-sidebar.component.scss"]
})
export class DocSidebarComponent implements OnInit {
  constructor(private router: Router) {}

  documentVM: Document;

  ngOnInit(): void {
    this.documentVM = new Document();
    this.documentVM.id = "555"
    this.documentVM.title = "Test Case Study" ;

  }

  public navigateToCaseStudyRoot(): void {
    this.router.navigateByUrl(`/edit/${this.documentVM.id}`);
  }
}
