import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

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
  private _tokenExpirationTimer: any;

  constructor(
    private store: Store<AppReducer.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number): void {
    this._tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
      this._tokenExpirationTimer = null;
    }
  }
}
