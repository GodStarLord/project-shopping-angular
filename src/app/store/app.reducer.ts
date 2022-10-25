import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as fromAuthReducer from '../auth/store/auth.reducer';
import * as fromRecipeReducer from '../recipes/store/recipe.reducer';

export interface AppState {
  shoppingList: fromShoppingListReducer.State;
  auth: fromAuthReducer.State;
  recipes: fromRecipeReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListReducer.ShoppingListReducer,
  auth: fromAuthReducer.authReducer,
  recipes: fromRecipeReducer.recipeReduer,
};
