import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse, User} from '../components/interfases';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router) {}

  get token(): string {
    return localStorage.getItem('token');
  }

  get displayName(): string {
    return localStorage.getItem('displayName');
  }

  public error$: Subject<string> = new Subject<string>();

  setToken(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('expiresIn', expDate.toString());
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('displayName', response.email);
    } else {
      localStorage.clear();
    }
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
    this.router.navigate(['login'], {
      queryParams: {
        loginAgain: true
      }
    });
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
    }
    return throwError(error);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.logout();
      this.router.navigate(['login'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }
}
