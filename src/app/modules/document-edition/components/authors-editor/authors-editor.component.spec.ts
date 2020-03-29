import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsEditorComponent } from './authors-editor.component';

describe('AuthorsEditorComponent', () => {
  let component: AuthorsEditorComponent;
  let fixture: ComponentFixture<AuthorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
