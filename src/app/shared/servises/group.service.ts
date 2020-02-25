import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FbResponse, Group} from '../components/interfases';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AlertService} from './alert.service';

export type GroupEmitType = 'create' | 'delete';

export interface GroupEmit {
  type: GroupEmitType;
  group: Group;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  public groupActions$ = new Subject<GroupEmit>();

  constructor(private http: HttpClient, private alert: AlertService) {
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get(`${environment.fbDbUrl}/groups.json`)
      .pipe(map((response: { [key: string]: any }) => {
        if (response) {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }));
        } else {
          return;
        }
      }));
  }

  create(group: Group): Observable<{ id: string }> {
    return this.http.post(`${environment.fbDbUrl}/groups.json`, group)
      .pipe(map((response: FbResponse) => {
        this.groupActions$.next({
          type: 'create',
          group: {
            ...group,
            id: response.name
          }
        });
        return {id: response.name};
      }));
  }

  update(group: Group): Observable<Group> {
    return this.http.patch<Group>(`${environment.fbDbUrl}/groups/${group.id}.json`, group);
  }

  delete(group: Group): Observable<void> {
    this.groupActions$.next({type: 'delete', group});
    return this.http.delete<void>(`${environment.fbDbUrl}/groups/${group.id}.json`);
  }

  getGroupsById(id: string): Observable<Group> {
    return this.http.get<Group>(`${environment.fbDbUrl}/groups/${id}.json`)
      .pipe(map((group: Group) => {
        return {
          ...group, id,
        };
      }));
  }

  getGroupByName(name: string): Observable<{ name: any }[]> {
    return this.http.get<Group>(`${environment.fbDbUrl}/groups.json?orderBy="name"&equalTo="${name}"`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            name: response[key].name
          }));
      }));
  }

  updateMembership(groupsIds: string[], userId: string) {
    if (groupsIds) {
      groupsIds.forEach((groupId) => {
        this.getGroupsById(groupId).subscribe((data) => {
          const group: Group = data;
          if (group.membership) {
            group.membership.push(userId);
          } else {
            group.membership = [userId];
          }
          this.update(group).subscribe((response) => {
            this.alert.success(`The Group "${group.name}" was Updated!`);
          });
        });
      });
    }
  }

  deleteMembership(groupsIds: string[], userId: string) {
    if (groupsIds) {
      groupsIds.forEach((groupId) => {
        this.getGroupsById(groupId).subscribe((data) => {
          const group: Group = data;
          group.membership = group.membership.filter((gr) => gr !== userId);
          this.update(group).subscribe((response) => {
            this.alert.success(`The Group "${group.name}" was Updated!`);
          });
        });
      });
    }
  }
}
