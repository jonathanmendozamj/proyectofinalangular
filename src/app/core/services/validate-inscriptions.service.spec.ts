import { TestBed } from '@angular/core/testing';

import { ValidateInscriptionsService } from './validate-inscriptions.service';

describe('ValidateInscriptionsService', () => {
  let service: ValidateInscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateInscriptionsService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
