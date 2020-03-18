import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditionComponent } from './document-edition.component';

describe('DocumentEditionComponent', () => {
  let component: DocumentEditionComponent;
  let fixture: ComponentFixture<DocumentEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
