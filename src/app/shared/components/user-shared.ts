import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {EffectivePermissions, Group, Permissions} from './interfases';

export class UserShared {

  permissions: Permissions[] = [];
  groups: Group[] = [];
  form: FormGroup;

  protected effectivePermissions = new Set<EffectivePermissions>();

  private get permissionsArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  private get membershipArray(): FormArray {
    return this.form.get('membership') as FormArray;
  }

  private static createFormControl(id: string) {
    return new FormControl(id);
  }

  protected addPermission(id: string) {
    this.permissionsArray.push(UserShared.createFormControl(id));
    this.addUserEffectivePermission(id);
  }

  private deletePermission(id: string) {
    let i = 0;
    this.permissionsArray.controls.forEach((item: FormControl) => {
      if (item.value === id) {
        this.permissionsArray.removeAt(i);
        this.deleteUserEffectivePermission(id);
        return;
      }
      i++;
    });
  }

  protected addMembership(id) {
    this.membershipArray.push(UserShared.createFormControl(id));
    this.addGroupEffectivePermission(id);
  }

  private deleteMembership(id: string) {
    let i = 0;
    this.membershipArray.controls.forEach((item: FormControl) => {
      if (item.value === id) {
        this.membershipArray.removeAt(i);
        this.deleteGroupEffectivePermission(id);
        return;
      }
      i++;
    });
  }

  private addUserEffectivePermission(id: string) {
    this.effectivePermissions.add({
      permission_id: id,
      group_id: 'null'
    });
  }

  private deleteUserEffectivePermission(id: string) {
    this.effectivePermissions.forEach(value => {
      if (value.group_id === 'null' && value.permission_id === id) {
        this.effectivePermissions.delete(value);
      }
    });
  }

  private addGroupEffectivePermission(id: string) {
    this.groups.find(group => group.id === id).permissions.forEach
    (permission => {
      this.effectivePermissions.add({
        permission_id: permission,
        group_id: id
      });
    });
  }

  private deleteGroupEffectivePermission(id: string) {
    this.effectivePermissions.forEach(value => {
      if (value.group_id === id) {
        this.effectivePermissions.delete(value);
      }
    });
  }

  addRemovePermission(e, id: string) {
    (e.target.checked) ? this.addPermission(id) : this.deletePermission(id);
  }

  addRemoveMembership(e, id: string) {
    (e.target.checked) ? this.addMembership(id) : this.deleteMembership(id);
  }

  getAllEffectivePermissions = () => {
    const unique = new Set();
    for (const elem of this.effectivePermissions) {
      unique.add(elem.permission_id);
    }
    return unique;
  }
}
