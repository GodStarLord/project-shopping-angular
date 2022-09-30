import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  /** @Input() allows us to bind this property from outside */
  @Input() recipe: Recipe;
  /** @Output() allows to listen to this event from outsite */
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    this.recipeSelected.emit();
  }
}
