import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FilterPipe} from '../shared/pipes/filter.pipe';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../shared/servises/user.service';
import {EventService} from '../shared/servises/event.service';
import {GroupService} from '../shared/servises/group.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageComponent, FilterPipe],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        UserService,
        EventService,
        GroupService,
        ComponentEventService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouterStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
