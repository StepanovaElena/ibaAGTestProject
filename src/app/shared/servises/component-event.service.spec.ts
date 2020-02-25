import { TestBed } from '@angular/core/testing';

import { ComponentEventService } from './component-event.service';

describe('ComponentEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentEventService = TestBed.get(ComponentEventService);
    expect(service).toBeTruthy();
  });
});
