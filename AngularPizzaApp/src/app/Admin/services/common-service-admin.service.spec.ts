import { TestBed } from '@angular/core/testing';

import { CommonServiceAdminService } from './common-service-admin.service';

describe('CommonServiceAdminService', () => {
  let service: CommonServiceAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonServiceAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
