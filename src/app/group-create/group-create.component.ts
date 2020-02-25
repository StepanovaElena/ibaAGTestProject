import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {Group, Permissions, User} from '../shared/components/interfases';
import {UserService} from '../shared/servises/user.service';
import {GroupService} from '../shared/servises/group.service';
import {EventService} from '../shared/servises/event.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {PermissionService} from '../shared/servises/permission.service';
import {AlertService} from '../shared/servises/alert.service';
import {nameUnique} from '../shared/validators/nameAsync.validators';
import {GroupShared} from '../shared/components/group-shared';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.less']
})
export class GroupCreateComponent extends GroupShared implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private eventService: EventService,
    private componentEventService: ComponentEventService,
    private permissionService: PermissionService,
    private alertService: AlertService,
    private router: Router) {
    super();
  }

  searchUser = '';

  pSub: Subscription;
  gSub: Subscription;
  cSub: Subscription;
  aSub: Subscription;

  ngOnInit() {
    this.getAllPermissions();
    this.getAllUsers();
    this.componentEventService.create('group');
    this.form = new FormGroup({
      name: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(4)
        ], [nameUnique(this.groupService)]),
      permissions: new FormArray([]),
      membership: new FormArray([])
    });

    this.form.statusChanges.subscribe(value => {
      this.componentEventService.validation(value.toLowerCase());
    });

    this.aSub = this.eventService.actions$.subscribe(data => {
      if (data.type === 'createGroup') {
        this.submit();
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const group: Group = {
      name: this.form.value.name,
      permissions: this.form.value.permissions,
      membership: this.form.value.membership
    };

    this.cSub = this.groupService.create(group).subscribe((data) => {
      if (group.membership) {
        this.userService.updateMembership(group.membership, data.id);
      }

      this.form.reset();
      this.alertService.success('New Group is Created!');
      this.router.navigate(['group/update/' + data.id]);
    });
  }

  getLabel(value: string) {
    if (value) {
      return this.permissions.find(permission => permission.id === value).name;
    }
    return;
  }

  getAllPermissions = () => {
    this.pSub = this.permissionService.getAllPermissions().subscribe((data: Permissions[]) =>
      (this.permissions = data));
  }

  getAllUsers = () => {
    this.gSub = this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

