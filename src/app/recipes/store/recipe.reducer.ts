import * as RecipeActions from './recipe.actions';

import { Recipe } from './../model/recipe.model';

// State for the Recipe
// Extracted from RecipeService i.e. the default or the initial state
export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReduer(
  state: State = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payLoad],
      };

    default:
      return state;
  }
}
