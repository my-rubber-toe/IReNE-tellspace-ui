import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-edition',
  templateUrl: './document-edition.component.html',
  styleUrls: ['./document-edition.component.scss']
})
export class DocumentEditionComponent implements OnInit {

  public isSaving : boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
