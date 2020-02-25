import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

import {Group} from '../shared/components/interfases';
import {UserService} from '../shared/servises/user.service';
import {EventService} from '../shared/servises/event.service';
import {PermissionService} from '../shared/servises/permission.service';
import {GroupService} from '../shared/servises/group.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {AlertService} from '../shared/servises/alert.service';
import {GroupShared} from '../shared/components/group-shared';

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.less']
})
export class GroupUpdateComponent extends GroupShared implements OnInit, OnDestroy {

  searchUser = '';

  dSub: Subscription;
  pSub: Subscription;
  gSub: Subscription;
  uSub: Subscription;
  rSub: Subscription;
  aSub: Subscription;

  private group: Group;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private eventService: EventService,
    private permissionService: PermissionService,
    private groupService: GroupService,
    private componentEventService: ComponentEventService,
    private alertService: AlertService) {
    super();
  }

  ngOnInit() {
    this.rSub = this.route.data.subscribe(data => {
      this.users = data.users;
      this.permissions = data.permissions;
    });
    this.componentEventService.update('group');
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.groupService.getGroupsById(params.id);
      })).subscribe((group: Group) => {
      this.group = group;
      this.form = new FormGroup({
        name: new FormControl({value: this.group.name, disabled: true}),
        permissions: new FormArray([]),
        membership: new FormArray([])
      });
      this.groupPermissions(this.group.permissions);
      this.groupUsers(this.group.membership);
    }, error => {
      this.router.navigate(['error']);
    });

    this.aSub = this.eventService.actions$.subscribe(data => {
      if (data.type === 'updateGroup') {
        this.submit();
      }
      if (data.type === 'deleteGroup') {
        this.delete(this.group);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.uSub = this.groupService.update({
      ...this.group,
      membership: this.form.value.membership,
      permissions: this.form.value.permissions
    })
      .subscribe(data => {
        if (this.group.membership && this.form.value.membership) {
          this.userService.deleteMembership(
            this.group.membership.filter(userId => !this.form.value.membership.includes(userId)
            ), this.group.id);

          this.userService.updateMembership(
            this.form.value.membership.filter(userId => !this.group.membership.includes(userId)
            ), this.group.id);
        }

        if (!this.group.membership) {
          this.userService.updateMembership(this.form.value.membership, this.group.id);
        }

        if (!this.form.value.membership) {
          this.groupService.deleteMembership(this.group.membership, this.group.id);
        }

        this.router.navigate(['group/create']);
        this.alertService.success(`The Group with name "${this.group.name}" was Updated!`);
      });
  }

  delete(group: Group) {
    this.dSub = this.groupService.delete(group).subscribe(() => {
      if (group.membership) {
        this.userService.deleteMembership(group.membership, group.id);
      }
      this.alertService.warning(`The Group with name "${group.name}" was Removed!`);
      this.router.navigate(['group/create']);
    });
  }

  groupPermissions(groupPermissions: string[]) {
    if (groupPermissions) {
      for (const items of groupPermissions) {
        this.addPermission(items);
      }
    }
  }

  groupUsers(groupUsers: string[]) {
    if (groupUsers) {
      for (const items of groupUsers) {
        this.addMembership(items);
      }
    }
  }

  getLabel(value: string) {
    const item = this.permissions.find(permission => permission.id === value);
    return item.name;
  }

  isExistUser(id: string) {
    if (this.group.membership) {
      return this.group.membership.find(user => user === id);
    }
    return;
  }

  isExistPermission(id: string) {
    if (this.group.permissions) {
      return this.group.permissions.find(permission => permission === id);
    }
    return;
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
