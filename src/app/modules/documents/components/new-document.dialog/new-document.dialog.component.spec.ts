import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocument.DialogComponent } from './new-document.dialog.component';

describe('NewDocument.DialogComponent', () => {
  let component: NewDocument.DialogComponent;
  let fixture: ComponentFixture<NewDocument.DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDocument.DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDocument.DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
