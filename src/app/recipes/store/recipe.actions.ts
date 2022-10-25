import { Action } from '@ngrx/store';

import { Recipe } from '../model/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payLoad: Recipe[]) {}
}

export type RecipeActions = SetRecipes;
