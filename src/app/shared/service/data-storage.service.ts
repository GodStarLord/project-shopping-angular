import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from 'src/app/recipes/model/recipe.model';

import { RecipeService } from 'src/app/recipes/service/recipe.service';

import * as RecipeActions from '../../recipes/store/recipe.actions';
import { AppState } from 'src/app/store/app.reducer';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://ng-course-recipebook-6c2f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipebook-6c2f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe['ingredients'] ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        })
      );
  }
}
