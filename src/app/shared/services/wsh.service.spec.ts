import { TestBed } from '@angular/core/testing';

import { WshService } from './wsh.service';

describe('WshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WshService = TestBed.get(WshService);
    expect(service).toBeTruthy();
  });
});
