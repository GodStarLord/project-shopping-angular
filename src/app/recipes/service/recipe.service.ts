import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../model/recipe.model';
import { Ingredient } from 'src/app/shared/model/ingredient.model';

import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Kunafa Sweet',
      'Kunafa Sweet Description',
      'https://th.bing.com/th/id/OIP.q93W5wlftaIGoYva7NkdYwHaFi?pid=ImgDet&rs=1',
      [new Ingredient('Bread', 3), new Ingredient('Jam', 1)]
    ),
    new Recipe(
      'Egg Bonda',
      'Egg Bonda Description',
      'https://3.bp.blogspot.com/-UMhQU4LP5x4/UhCM5aQb59I/AAAAAAAAAS8/EVOaF6P0FZE/s1600/100_3227.JPG',
      [new Ingredient('Peanuts', 10), new Ingredient('Berries', 50)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
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
