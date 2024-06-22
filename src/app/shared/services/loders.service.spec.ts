import { TestBed } from '@angular/core/testing';

import { LodersService } from './loders.service';

describe('LodersService', () => {
  let service: LodersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LodersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
