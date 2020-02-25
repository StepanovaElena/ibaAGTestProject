import {inject, TestBed} from '@angular/core/testing';

import { GroupService } from './group.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('GroupService', () => {
  let service;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GroupService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([GroupService], s => {
    service = s;
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
