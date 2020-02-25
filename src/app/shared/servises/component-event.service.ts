import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export type EventType = 'create' | 'update' | 'invalid' | 'valid';
export type EntityType = 'user' | 'group';

export interface LoadingEvent {
  type?: EventType;
  entityType?: EntityType;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentEventService {

  constructor() {
  }

  public loading$ = new Subject<LoadingEvent>();

  create(entity) {
    this.loading$.next({type: 'create', entityType: entity});
  }

  update(entity) {
    this.loading$.next({type: 'update', entityType: entity});
  }

  validation(value: string) {
    if (value === 'invalid') {
      this.loading$.next({type: 'invalid'});
    } else {
      this.loading$.next({type: 'valid'});    }

  }
}
