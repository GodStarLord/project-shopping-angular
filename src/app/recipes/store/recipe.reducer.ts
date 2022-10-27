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

    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payLoad],
      };

    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payLoad.index],
        ...action.payLoad.newRecipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payLoad.index] = updatedRecipe;

      return {
        ...state,
        recipes: [...updatedRecipes],
      };

    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter((recipe, index) => {
            return index !== action.payLoad;
          }),
        ],
      };

    default:
      return state;
  }
}
