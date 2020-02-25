import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export type ActionType = 'createUser' | 'createGroup' | 'updateUser' | 'updateGroup' | 'deleteUser' | 'deleteGroup';

export interface EventActions {
  type?: ActionType;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() {
  }

  public actions$ = new Subject<EventActions>();

  createUser() {
    this.actions$.next({type: 'createUser'});
  }

  createGroup() {
    this.actions$.next({type: 'createGroup'});
  }

  updateUser() {
    this.actions$.next({type: 'updateUser'});
  }

  updateGroup() {
    this.actions$.next({type: 'updateGroup'});
  }

  deleteUser() {
    this.actions$.next({type: 'deleteUser'});
  }

  deleteGroup() {
    this.actions$.next({type: 'deleteGroup'});
  }
}
