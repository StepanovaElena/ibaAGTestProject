import {Component, OnDestroy, OnInit} from '@angular/core';

import {Group, User} from '../shared/components/interfases';
import {EventService} from '../shared/servises/event.service';
import {UserService} from '../shared/servises/user.service';
import {GroupService} from '../shared/servises/group.service';
import {Subscription} from 'rxjs';
import {ComponentEventService} from '../shared/servises/component-event.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less'],
})
export class UserPageComponent implements OnInit, OnDestroy {

  search = '';
  open = false;
  addButtonDisabled: boolean;
  deleteButtonDisabled: boolean;
  updateButtonShown = false;
  entity: string;
  users: User[] = [];
  groups: Group[] = [];

  dSub: Subscription;
  uSub: Subscription;
  gSub: Subscription;
  eSub: Subscription;
  aSub: Subscription;
  gaSub: Subscription;

  constructor(
    private eventService: EventService,
    private componentEventService: ComponentEventService,
    private userService: UserService,
    private groupService: GroupService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllGroups();
    this.aSub = this.userService.userActions$.subscribe(data => {
      if (data.type === 'create') {
        (this.users) ? this.users.push(data.user) : this.users = [data.user];
      }
      if (data.type === 'delete') {
        this.users = this.users.filter(user => user.id !== data.user.id);
      }
    });

    this.gaSub = this.groupService.groupActions$.subscribe(data => {
      if (data.type === 'create') {
        (this.groups) ? this.groups.push(data.group) : this.groups = [data.group];
      }
      if (data.type === 'delete') {
        this.groups = this.groups.filter(group => group.id !== data.group.id);
      }
    });

    this.eSub = this.componentEventService.loading$.subscribe(data => {
      if (data.type === 'create') {
        this.entity = data.entityType;
        this.deleteButtonDisabled = true;
        this.updateButtonShown = false;
      }
      if (data.type === 'update') {
        this.entity = data.entityType;
        this.deleteButtonDisabled = false;
        this.updateButtonShown = true;
      }
      this.addButtonDisabled = data.type === 'invalid';
    });
  }

  add(e: MouseEvent) {
    (this.entity === 'user') ? this.eventService.createUser() : this.eventService.createGroup();
  }

  delete(e: MouseEvent) {
    (this.entity === 'user') ? this.eventService.deleteUser() : this.eventService.deleteGroup();
  }

  update(e: MouseEvent) {
    (this.entity === 'user') ? this.eventService.updateUser() : this.eventService.updateGroup();
  }

  getAllUsers = () => {
    this.uSub = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  getAllGroups = () => {
    this.gSub = this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  displayOpen($event: Event) {
    this.open = true;
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
    if (this.eSub) {
      this.eSub.unsubscribe();
    }
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.gaSub) {
      this.gaSub.unsubscribe();
    }
  }
}
