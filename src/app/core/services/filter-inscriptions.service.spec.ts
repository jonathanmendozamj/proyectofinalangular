import { TestBed } from '@angular/core/testing';

import { FilterInscriptionsService } from './filter-inscriptions.service';

describe('FilterInscriptionsService', () => {
  let service: FilterInscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterInscriptionsService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
