import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreateComponent } from './group-create.component';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe} from '@angular/core';
import {FilterPipe} from '../shared/pipes/filter.pipe';
import {UserService} from '../shared/servises/user.service';
import {GroupService} from '../shared/servises/group.service';
import {EventService} from '../shared/servises/event.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {PermissionService} from '../shared/servises/permission.service';
import {AlertService} from '../shared/servises/alert.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

export class RouterStub {
  //navigate(path: string);
}

describe('GroupCreateComponent', () => {
  let component: GroupCreateComponent;
  let fixture: ComponentFixture<GroupCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCreateComponent, FilterPipe ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        UserService,
        GroupService,
        EventService,
        ComponentEventService,
        PermissionService,
        AlertService,
        {provide: Router, useClass: RouterStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
