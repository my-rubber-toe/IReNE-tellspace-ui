import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsCategoriesEditorComponent } from './tags-categories-editor.component';

describe('TagsCategoriesEditorComponent', () => {
  let component: TagsCategoriesEditorComponent;
  let fixture: ComponentFixture<TagsCategoriesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsCategoriesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsCategoriesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
