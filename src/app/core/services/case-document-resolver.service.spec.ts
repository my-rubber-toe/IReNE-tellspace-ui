import { TestBed } from '@angular/core/testing';

import { CaseDocumentResolverService } from './case-document-resolver.service';

describe('CaseDocumentResolverService', () => {
  let service: CaseDocumentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseDocumentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
