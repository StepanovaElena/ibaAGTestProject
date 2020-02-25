import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupUpdateComponent} from './group-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FilterPipe} from '../shared/pipes/filter.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../shared/servises/user.service';
import {GroupService} from '../shared/servises/group.service';
import {EventService} from '../shared/servises/event.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {PermissionService} from '../shared/servises/permission.service';
import {AlertService} from '../shared/servises/alert.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Permissions, User} from '../shared/components/interfases';

const mockUsers = [
  {id: '1', login: 'admin', email: 'admin@mail.ru', password: '123456'},
  {id: '2', login: 'user', email: 'user@mail.ru', password: '123456'},
  {id: '3', login: 'user1', email: 'user1@mail.ru', password: '123456'}
] as User[];

const mockPermissions = [
  {id: '1', name: 'One'},
  {id: '2', name: 'Two'},
  {id: '3', name: 'Three'}
] as Permissions[];

export class RouterStub {
  // navigate(path: string);
}

export class ActivatedRouterStub {
  private paramsSubject = new Subject<Params>();
  private dataSubject = new Subject<Data>();

  push(params: Params) {
    this.paramsSubject.next(params);
  }

  pushData(data: Data) {
    this.dataSubject.next(data);
  }

  get data() {
    return this.dataSubject.asObservable();
  }

  get params() {
    return this.paramsSubject.asObservable();
  }
}

describe('GroupUpdateComponent', () => {
  let component: GroupUpdateComponent;
  let fixture: ComponentFixture<GroupUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupUpdateComponent, FilterPipe],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        UserService,
        GroupService,
        EventService,
        ComponentEventService,
        PermissionService,
        AlertService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouterStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    const route: ActivatedRouterStub = TestBed.get(ActivatedRoute);
    route.pushData({users: mockUsers});
    component.ngOnInit();
    expect(component.users).toBe(mockUsers);
  });

  it('should get permissions', () => {
    const route: ActivatedRouterStub = TestBed.get(ActivatedRoute);
    route.pushData({permissions: mockPermissions});
    component.ngOnInit();
    expect(component.permissions).toBe(mockPermissions);
  });
});
