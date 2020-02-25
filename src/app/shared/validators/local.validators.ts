import {FormGroup} from '@angular/forms';

export class LocalValidators {

  static passConfirmation(group: FormGroup) {
    return group.get('passwordMain').value === group.get('passwordConfirm').value ? null : {passConfirmation: true};
  }
}
