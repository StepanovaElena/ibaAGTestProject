import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserService} from '../servises/user.service';
import {map} from 'rxjs/operators';

export function emailUnique(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getUserByEmail(control.value).pipe(map(
      responce => {
        return (responce.length > 0) ? {uniqueEmail: true} : null;
      }
    ));
  };
}


