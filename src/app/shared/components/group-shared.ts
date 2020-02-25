import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Permissions, User} from './interfases';

export class GroupShared {

  form: FormGroup;
  permissions: Permissions[] = [];
  users: User[] = [];

  private static createFormControl(id: string) {
    return new FormControl(id);
  }

  private get permissionsArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  private get membershipArray(): FormArray {
    return this.form.get('membership') as FormArray;
  }

  addRemovePermission(e, id: string) {
    (e.target.checked) ? this.addPermission(id) : this.deletePermission(id);
  }

  addRemoveMembership(e, id: string) {
    (e.target.checked) ? this.addMembership(id) : this.deleteMembership(id);
  }

  protected addPermission(id: string) {
    this.permissionsArray.push(GroupShared.createFormControl(id));
  }

  private deletePermission(id: string) {
    let i = 0;
    this.permissionsArray.controls.forEach((item: FormControl) => {
      if (item.value === id) {
        this.permissionsArray.removeAt(i);
        return;
      }
      i++;
    });
  }

  protected addMembership(id: string) {
    this.membershipArray.push(GroupShared.createFormControl(id));
  }

  private deleteMembership(id: string) {
    let i = 0;
    this.membershipArray.controls.forEach((item: FormControl) => {
      if (item.value === id) {
        this.membershipArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}
