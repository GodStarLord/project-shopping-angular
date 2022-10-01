import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../model/recipe.model';

import { RecipeService } from '../../service/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  /** @Input() allows us to bind this property from outside */
  @Input() index: number;
  recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipe(this.index);
  }
}
