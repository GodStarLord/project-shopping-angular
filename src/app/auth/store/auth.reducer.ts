import { User } from '../model/user.model';

import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authErrorMsg: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  authErrorMsg: null,
  isLoading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payLoad.email,
        action.payLoad.userId,
        action.payLoad.token,
        action.payLoad.expirationDate
      );
      return {
        ...state,
        authErrorMsg: null,
        user,
        isLoading: false,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return { ...state, authErrorMsg: null, isLoading: true };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        authErrorMsg: action.payLoad,
        user: null,
        isLoading: false,
      };

    case AuthActions.CLEAR_ERROR:
      return { ...state, authErrorMsg: null };

    default:
      return state;
  }
}
