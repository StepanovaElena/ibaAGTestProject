import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PermissionService} from '../servises/permission.service';
import {Permissions} from '../components/interfases';


@Injectable({providedIn: 'root'})
export class PermissionResolver implements Resolve<Permissions[]> {

  constructor(private permissionService: PermissionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Permissions[]> | Promise<Permissions[]> | Permissions[] {
    return this.permissionService.getAllPermissions();
  }

}
