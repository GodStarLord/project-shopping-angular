import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number; //  Recipe ID

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //  This line will only work when we first time load the component
    //  const id = this.route.snapshot.params['id'];

    //  This subscribs to the route and reacts to the change in value
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShopingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
