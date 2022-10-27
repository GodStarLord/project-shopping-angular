import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  /** @Input() allows us to bind this property from outside */
  @Input() index: number;
  @Input() recipe: Recipe;

  constructor() {}

  ngOnInit(): void {}
}
