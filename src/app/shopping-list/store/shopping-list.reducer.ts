import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/model/ingredient.model';
import { ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomato', 2)],
};

export function ShoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients],
      };
  }
}
