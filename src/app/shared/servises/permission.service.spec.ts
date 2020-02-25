import {inject, TestBed} from '@angular/core/testing';

import { PermissionService } from './permission.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {User} from '../components/interfases';

const mockData = [
  {id: 'one', name: 'One'},
  {id: 'two', name: 'Two'},
  {id: 'three', name: 'Tree'}
] as unknown as Permissions[];

describe('PermissionService', () => {
  let service;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [PermissionService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([PermissionService], s => {
    service = s;
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPermissions', () => {
    const mockPermissions = [...mockData];
    it('should return mock permissions', () => {

      service.getAllPermissions().subscribe(
        permissions => expect(permissions.length).toEqual(mockPermissions.length),
        fail
      );
      const req = httpTestingController.expectOne(`${environment.fbDbUrl}/permissions.json`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockPermissions);
    });
  });

});
