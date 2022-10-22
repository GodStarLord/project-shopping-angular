import { User } from '../model/user.model';

import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
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
        user,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
