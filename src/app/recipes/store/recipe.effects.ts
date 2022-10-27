import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Recipe } from '../model/recipe.model';

import * as RecipeActions from './recipe.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

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

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        'https://ng-course-recipebook-6c2f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipesState.recipes
      );
    })
  );
}
