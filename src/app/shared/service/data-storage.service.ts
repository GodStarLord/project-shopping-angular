import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from 'src/app/recipes/model/recipe.model';

import { RecipeService } from 'src/app/recipes/service/recipe.service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipebook-6c2f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          { params: new HttpParams().set('auth', user.token) }
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
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
