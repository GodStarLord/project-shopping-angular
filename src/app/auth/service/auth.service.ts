import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../model/user.model';

import * as AppReducer from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface SignInResponseData extends AuthResponseData {
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private _tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private store: Store<AppReducer.AppState>
  ) {}

  singUp(email: string, password: string): Observable<AuthResponseData> {
    const URL =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      environment.firebaseAPIKey;
    return this.http
      .post<AuthResponseData>(URL, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    const signInURL =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      environment.firebaseAPIKey;
    return this.http
      .post<SignInResponseData>(signInURL, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  logout(): void {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');

    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
  }

  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number): void {
    this._tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const exiprationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, exiprationDate);
    // this.user.next(user);
    this.store.dispatch(
      new AuthActions.AuthenticateSuccess({
        email: user.id,
        userId: user.id,
        token: user.token,
        expirationDate: exiprationDate,
      })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error)
      return throwError(() => new Error(errorMessage));
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password entered is incorrect!';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
