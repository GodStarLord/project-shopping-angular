import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Recipe } from '../model/recipe.model';

import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private store$: Store<AppState>, private actions$: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> {
    return this.store$.select('recipes').pipe(
      take(1),
      map((recipeState) => recipeState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          // Dispatch an action
          this.store$.dispatch(new RecipeActions.FetchRecipes());
          // wait for the action ofType to be completed
          return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
