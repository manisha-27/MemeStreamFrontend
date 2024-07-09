import { TestBed } from '@angular/core/testing';

import { MemedataService } from './memedata.service';

describe('MemedataService', () => {
  let service: MemedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
