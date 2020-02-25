import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateComponent } from './user-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FilterPipe} from '../shared/pipes/filter.pipe';
import {UserService} from '../shared/servises/user.service';
import {EventService} from '../shared/servises/event.service';
import {GroupService} from '../shared/servises/group.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {PermissionService} from '../shared/servises/permission.service';
import {AlertService} from '../shared/servises/alert.service';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

export class RouterStub {
  // navigate(path: string);
}

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateComponent, FilterPipe],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        UserService,
        EventService,
        GroupService,
        ComponentEventService,
        PermissionService,
        AlertService,
        {provide: Router, useClass: RouterStub},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
