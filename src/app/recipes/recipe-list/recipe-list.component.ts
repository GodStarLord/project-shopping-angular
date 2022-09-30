import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Kunafa Sweet',
      'Kunafa Sweet Description',
      'https://th.bing.com/th/id/OIP.q93W5wlftaIGoYva7NkdYwHaFi?pid=ImgDet&rs=1'
    ),
    new Recipe(
      'Egg Bonda',
      'Egg Bonda Description',
      'https://3.bp.blogspot.com/-UMhQU4LP5x4/UhCM5aQb59I/AAAAAAAAAS8/EVOaF6P0FZE/s1600/100_3227.JPG'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(selectedRecipe: Recipe) {
    this.recipeWasSelected.emit(selectedRecipe);
  }
}
