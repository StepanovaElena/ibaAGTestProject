import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../shared/servises/user.service';
import {User} from '../shared/components/interfases';
import {LocalValidators} from '../shared/validators/local.validators';
import {EventService} from '../shared/servises/event.service';
import {PermissionService} from '../shared/servises/permission.service';
import {AlertService} from '../shared/servises/alert.service';
import {GroupService} from '../shared/servises/group.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {UserShared} from '../shared/components/user-shared';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.less']
})
export class UserUpdateComponent extends UserShared implements OnInit, OnDestroy {

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

  searchGroup = '';

  dSub: Subscription;
  uSub: Subscription;
  rSub: Subscription;
  fSub: Subscription;
  aSub: Subscription;

  private user: User;

  ngOnInit() {
    this.rSub = this.route.data.subscribe(data => {
      this.groups = data.groups;
      this.permissions = data.permissions;
      this.effectivePermissions.clear();
    });
    this.componentEventService.update('user');
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.userService.getUserById(params.id);
      })).subscribe((user: User) => {
      this.user = user;
      this.form = new FormGroup({
        login: new FormControl(
          this.user.login,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12)
          ]),
        email: new FormControl({value: this.user.email, disabled: true}),
        password: new FormGroup({
          passwordMain: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
          passwordConfirm: new FormControl(this.user.password, [Validators.required]),
        }, {validators: LocalValidators.passConfirmation}),
        permissions: new FormArray([]),
        membership: new FormArray([])
      });
      this.userPermissions(this.user.permissions);
      this.userGroups(this.user.membership);

      this.fSub = this.form.statusChanges.subscribe(value => {
        this.componentEventService.validation(value.toLowerCase());
      });
    }, error => {
      this.router.navigate(['error']);
    });

    this.aSub = this.eventService.actions$.subscribe(data => {
      if (data.type === 'updateUser') {
        this.submit();
      }
      if (data.type === 'deleteUser') {
        this.delete(this.user);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.uSub = this.userService.update(
      {
        ...this.user,
        login: this.form.value.login,
        email: this.form.value.email,
        password: this.form.value.password.passwordMain,
        membership: this.form.value.membership,
        permissions: this.form.value.permissions
      })
      .subscribe(() => {
        if (this.user.membership && this.form.value.membership) {
          this.groupService.deleteMembership(
            this.user.membership.filter(groupId => !this.form.value.membership.includes(groupId)
            ), this.user.id);

          this.groupService.updateMembership(
            this.form.value.membership.filter(groupId => !this.user.membership.includes(groupId)
            ), this.user.id);
        }

        if (!this.user.membership) {
          this.groupService.updateMembership(this.form.value.membership, this.user.id);
        }

        if (!this.form.value.membership) {
          this.groupService.deleteMembership(this.user.membership, this.user.id);
        }

        this.alertService.success(`The User with login "${this.user.login}" was Updated!`);
        this.router.navigate(['user/create']);
      });
  }

  delete(user: User) {
    this.dSub = this.userService.delete(user).subscribe(() => {
      if (this.user.membership) {
        this.groupService.deleteMembership(this.user.membership, this.user.id);
      }
      this.alertService.warning(`The User with login "${this.user.login}" was Deleted!`);
      this.router.navigate(['user/create']);
    });
  }

  userPermissions(userPermissions: string[]) {
    if (userPermissions) {
      for (const permission of userPermissions) {
        this.addPermission(permission);
      }
    }
  }

  userGroups(userGroups: string[]) {
    if (userGroups) {
      for (const groupId of userGroups) {
        this.addMembership(groupId);
      }
    }
  }

  getLabel(value: string) {
    if (value) {
      return this.permissions.find(permission => permission.id === value).name;
    }
  }

  isExistGroup(id: string) {
    if (this.user.membership) {
      return this.user.membership.find(group => group === id);
    }
    return;
  }

  isExistPermission(id: string) {
    if (this.user.permissions) {
      return this.user.permissions.find(permission => permission === id);
    }
    return;
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.fSub) {
      this.fSub.unsubscribe();
    }
  }
}
