import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GroupService} from '../servises/group.service';

export function nameUnique(groupService: GroupService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return groupService.getGroupByName(control.value).pipe(map(
      responce => {
        return (responce.length > 0) ? {uniqueName: true} : null;
      }
    ));
  };
}


