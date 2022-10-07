import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../model/user.model';

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
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}

  singUp(email: string, password: string): Observable<AuthResponseData> {
    const URL =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEZIrEeJ8QN-djo6fEXidcUmnX4afnMpU';
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
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEZIrEeJ8QN-djo6fEXidcUmnX4afnMpU';
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

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const exiprationDate = new Date(new Date().getTime() * expiresIn * 1000);
    const user = new User(email, userId, token, exiprationDate);
    this.user.next(user);
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
