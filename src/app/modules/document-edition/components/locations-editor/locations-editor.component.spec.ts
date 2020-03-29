import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsEditorComponent } from './locations-editor.component';

describe('LocationsEditorComponent', () => {
  let component: LocationsEditorComponent;
  let fixture: ComponentFixture<LocationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
