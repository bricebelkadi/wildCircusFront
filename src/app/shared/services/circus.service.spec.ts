import { TestBed } from '@angular/core/testing';

import { CircusService } from './circus.service';

describe('CircusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CircusService = TestBed.get(CircusService);
    expect(service).toBeTruthy();
  });
});
