import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../model/recipe.model';

import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('recipes')
      .pipe(map((recipeState) => recipeState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
