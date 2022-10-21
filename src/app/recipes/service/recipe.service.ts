import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from '../model/recipe.model';
import { Ingredient } from 'src/app/shared/model/ingredient.model';

import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingListReducer from '../../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingListReducer.AppState>
  ) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesWasChanged();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesWasChanged();
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesWasChanged();
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesWasChanged();
  }

  private recipesWasChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
