import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

import {EffectivePermissions, FbResponse, Group, User} from '../components/interfases';
import {PermissionService} from './permission.service';
import {AlertService} from './alert.service';


export type UserEmitType = 'create' | 'delete';

export interface UserEmit {
  type: UserEmitType;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userActions$ = new Subject<UserEmit>();

  constructor(private http: HttpClient, private alert: AlertService) {
  }

  create(user: User): Observable<{ id: string }> {
    return this.http.post(`${environment.fbDbUrl}/users.json`, user)
      .pipe(map((response: FbResponse) => {
        this.userActions$.next({
          type: 'create',
          user: {
            ...user,
            id: response.name
          }
        });
        return {
          id: response.name
        };
      }));
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.fbDbUrl}/users/${user.id}.json`, user);
  }

  delete(user: User): Observable<void> {
    this.userActions$.next({type: 'delete', user});
    return this.http.delete<void>(`${environment.fbDbUrl}/users/${user.id}.json`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(`${environment.fbDbUrl}/users.json`)
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

  getUserByEmail(email: string): Observable<{ email: any }[]> {
    return this.http.get<User>(`${environment.fbDbUrl}/users.json?orderBy="email"&equalTo="${email}"`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            email: response[key].email
          }));
      }));
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.fbDbUrl}/users/${id}.json`)
      .pipe(map((user: User) => {
        return {
          ...user, id,
        };
      }));
  }

  updateMembership(usersIds: string[], groupId: string) {
    if (usersIds) {
      usersIds.forEach((userId) => {
        this.getUserById(userId).subscribe((data) => {
          const user: User = data;
          if (user.membership) {
            user.membership.push(groupId);
          } else {
            user.membership = [groupId];
          }
          this.update(user).subscribe((response) => {
            this.alert.success(`The User "${user.login}" was Updated!`);
          });
        });
      });
    }
  }

  deleteMembership(usersIds: string[], groupId: string) {
    if (usersIds) {
      usersIds.forEach((userId) => {
        this.getUserById(userId).subscribe((data) => {
          const user: User = data;
          user.membership = user.membership.filter((id) => id !== groupId);
          this.update(user).subscribe((response) => {
            this.alert.success(`The User "${user.login}" was Updated!`);
          });
        });
      });
    }
  }

}
