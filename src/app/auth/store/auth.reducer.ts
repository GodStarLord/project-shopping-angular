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
    case AuthActions.LOGIN:
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
      return { ...state, authErrorMsg: null, isLoading: true };

    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        authErrorMsg: action.payLoad,
        user: null,
        isLoading: false,
      };

    default:
      return state;
  }
}
