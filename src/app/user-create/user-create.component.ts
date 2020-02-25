import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Group, Permissions, User} from '../shared/components/interfases';
import {UserService} from '../shared/servises/user.service';
import {EventService} from '../shared/servises/event.service';
import {PermissionService} from '../shared/servises/permission.service';
import {LocalValidators} from '../shared/validators/local.validators';
import {emailUnique} from '../shared/validators/emailAsync.validators';
import {GroupService} from '../shared/servises/group.service';
import {ComponentEventService} from '../shared/servises/component-event.service';
import {AlertService} from '../shared/servises/alert.service';
import {UserShared} from '../shared/components/user-shared';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.less']
})
export class UserCreateComponent extends UserShared implements OnInit, OnDestroy {

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

  searchGroup = '';

  pSub: Subscription;
  gSub: Subscription;
  aSub: Subscription;
  cSub: Subscription;
  fSub: Subscription;

  ngOnInit() {
    this.getAllPermissions();
    this.getAllGroups();
    this.componentEventService.create('user');
    this.form = new FormGroup({
      login: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12)
        ]),
      email: new FormControl(null,
        [Validators.required, Validators.email],
        [emailUnique(this.userService)]),
      password: new FormGroup({
        passwordMain: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl(null, [Validators.required]),
      }, {validators: LocalValidators.passConfirmation}),
      permissions: new FormArray([]),
      membership: new FormArray([])
    });

    this.fSub = this.form.statusChanges.subscribe(value => {
      this.componentEventService.validation(value.toLowerCase());
    });

    this.aSub = this.eventService.actions$.subscribe(data => {
      if (data.type === 'createUser') {
        this.submit();
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      login: this.form.value.login,
      password: this.form.value.password.passwordMain,
      email: this.form.value.email,
      permissions: this.form.value.permissions,
      membership: this.form.value.membership
    };

    this.cSub = this.userService.create(user).subscribe((data) => {
      if (user.membership) {
        this.groupService.updateMembership(user.membership, data.id);
      }

      this.form.reset();
      this.alertService.success('New User is Created!');
      this.router.navigate(['user/update/' + data.id]);
    });
  }

  getAllPermissions = () => {
    this.pSub = this.permissionService.getAllPermissions().subscribe((data: Permissions[]) =>
      (this.permissions = data));
  }

  getAllGroups = () => {
    this.gSub = this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
    if (this.fSub) {
      this.fSub.unsubscribe();
    }
  }

  getLabel(value: string) {
    if (value) {
      return this.permissions.find(permission => permission.id === value).name;
    }
  }
}
