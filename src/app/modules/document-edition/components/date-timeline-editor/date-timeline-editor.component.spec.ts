import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimelineEditorComponent } from './date-timeline-editor.component';

describe('DateTimelineEditorComponent', () => {
  let component: DateTimelineEditorComponent;
  let fixture: ComponentFixture<DateTimelineEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimelineEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimelineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
