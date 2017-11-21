import { TestBed, inject } from '@angular/core/testing';

import { GoogleapiService } from './googleapi.service';

describe('GoogleapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleapiService]
    });
  });

  it('should be created', inject([GoogleapiService], (service: GoogleapiService) => {
    expect(service).toBeTruthy();
  }));
});
