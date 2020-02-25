import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../components/interfases';
import {environment} from '../../../environments/environment';

const mockData = [
  {id: '1', login: 'admin', email: 'admin@mail.ru', password: '123456'},
  {id: '2', login: 'user', email: 'user@mail.ru', password: '123456'},
  {id: '3', login: 'user1', email: 'user1@mail.ru', password: '123456'}
] as User[];

describe('UserService', () => {
  let service;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [UserService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([UserService], s => {
    service = s;
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserById', () => {
    const mockUser = mockData[0];
    const mockUserId = mockData[0].id;
    it('should return mock user', () => {

      service.getUserById(mockUserId).subscribe(
        user => expect(user.email).toBe(mockUser.email),
        fail
      );
      const req = httpTestingController.expectOne(`${environment.fbDbUrl}/users/${mockUserId}.json`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockUser);
    });
  });

  describe('getUsers', () => {
    const mockUsers = [...mockData];
    it('should return mock users', () => {

      service.getAllUsers().subscribe(
        users => expect(users.length).toEqual(mockUsers.length),
        fail
      );
      const req = httpTestingController.expectOne(`${environment.fbDbUrl}/users.json`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockUsers);
    });
  });


  describe('updateUser', () => {
    const mockUser = mockData[0];
    it('should update user', () => {
      service.update(mockUser).subscribe(
        response => expect(response).toEqual(mockUser),
        fail
      );
      const req = httpTestingController.expectOne(`${environment.fbDbUrl}/users/${mockUser.id}.json`);
      expect(req.request.method).toEqual('PATCH');
      req.flush(mockUser);
    });
  });

  describe('deleteUser', () => {
    const mockUser = mockData[0];
    it('should delete user', () => {
      service.delete(mockUser).subscribe(
        response => expect(response).toEqual(null),
        fail
      );
      const req = httpTestingController.expectOne(`${environment.fbDbUrl}/users/${mockUser.id}.json`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });
  });
});
