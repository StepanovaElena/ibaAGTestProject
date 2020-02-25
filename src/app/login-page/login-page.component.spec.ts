import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginPageComponent} from './login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../shared/servises/auth.service';
import {HttpClientModule} from '@angular/common/http';

export class RouterStub {
  // navigate(path: string[]);
}

export class ActivatedRouterStub {
  private subject$ = new Subject<Params>();

  push(queryParams: Params) {
    this.subject$.next(queryParams);
  }

  get queryParams() {
    return this.subject$.asObservable();
  }
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let router = Router;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouterStub},
        AuthService
      ]
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should get message "Please, enter data!"', () => {
    const route: ActivatedRouterStub = TestBed.get(ActivatedRoute);
    route.push({loginAgain: 'true'});
    component.ngOnInit();
    expect(component.message).toEqual('Please, enter data!');
  });

  it('should get message "Please, login again!"', () => {
    const route: ActivatedRouterStub = TestBed.get(ActivatedRoute);
    route.push({authFailed: true});
    component.ngOnInit();
    expect(component.message).toEqual('Please, login again!');
  });

});
