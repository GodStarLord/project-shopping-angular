import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';

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

@Injectable()
export class AuthEffects {
  // Stream of dispatched actions
  // * variable$ => $ is suffixed for an observable

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const signInURL =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.firebaseAPIKey;
      return this.http
        .post<SignInResponseData>(signInURL, {
          email: authData.payLoad.email,
          password: authData.payLoad.password,
          returnSecureToken: true,
        })
        .pipe(
          map((resData) => {
            const exiprationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return of(
              new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: exiprationDate,
              })
            );
          }),
          catchError((error) => {
            // ... error handling code...
            // ! must return an non error observable such that this observable never dies
            return of();
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
