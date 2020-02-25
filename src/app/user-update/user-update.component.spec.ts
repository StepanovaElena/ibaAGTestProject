import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateComponent } from './user-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FilterPipe} from '../shared/pipes/filter.pipe';
import {UserService} from '../shared/servises/user.service';
import {EventService} from '../shared/servises/event.service';
import {GroupService} from '../shared/servises/group.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {PermissionService} from '../shared/servises/permission.service';
import {AlertService} from '../shared/servises/alert.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Subject} from 'rxjs';

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

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateComponent, FilterPipe],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        UserService,
        EventService,
        GroupService,
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
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
