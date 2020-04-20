import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsEditorComponent } from './actors-editor.component';

describe('ActorsEditorComponent', () => {
  let component: ActorsEditorComponent;
  let fixture: ComponentFixture<ActorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
