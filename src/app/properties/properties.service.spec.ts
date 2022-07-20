import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PropertiesService } from './properties.service';

describe('PropertiesService', () => {
  let service: PropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(PropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
