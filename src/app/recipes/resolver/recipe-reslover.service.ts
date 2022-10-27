import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
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
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // Dispatch an action
    this.store$.dispatch(new RecipeActions.FetchRecipes());
    // wait for the action ofType to be completed
    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
  }
}
