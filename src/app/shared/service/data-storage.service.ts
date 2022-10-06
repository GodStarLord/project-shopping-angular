import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from 'src/app/recipes/model/recipe.model';

import { RecipeService } from 'src/app/recipes/service/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://ng-course-recipebook-6c2f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        'https://ng-course-recipebook-6c2f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .subscribe((recipes: Recipe[]) => this.recipeService.setRecipes(recipes));
  }
}
