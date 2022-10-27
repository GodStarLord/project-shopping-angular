import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Recipe } from '../model/recipe.model';

import * as RecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://ng-course-recipebook-6c2f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe['ingredients'] ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes: Recipe[]) => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );
}
