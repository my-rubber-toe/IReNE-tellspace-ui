import { TestBed } from '@angular/core/testing';

import { DocumentEditionService } from './document-edition.service';

describe('DocumentEditionService', () => {
  let service: DocumentEditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentEditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
