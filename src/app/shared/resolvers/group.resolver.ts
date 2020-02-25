import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Group} from '../components/interfases';
import {Observable} from 'rxjs';
import {GroupService} from '../servises/group.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GroupResolver implements Resolve<Group[]> {

  constructor(private groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Group[]> | Promise<Group[]> | Group[] {
    return this.groupService.getAllGroups();
  }

}
