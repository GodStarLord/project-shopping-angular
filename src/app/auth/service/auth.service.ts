import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occured!';
          if (!errorRes.error || !errorRes.error.error)
            return throwError(errorMessage);
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists!';
          }
          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string) {
    const signInURL =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEZIrEeJ8QN-djo6fEXidcUmnX4afnMpU';
    return this.http.post<SignInResponseData>(signInURL, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
