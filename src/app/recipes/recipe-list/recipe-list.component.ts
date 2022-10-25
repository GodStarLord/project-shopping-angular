import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../model/recipe.model';

import { RecipeService } from '../service/recipe.service';

import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
      this.recipes = this.recipeService.getRecipes();

    // this.store
    //   .select('recipes')
    //   .pipe(
    //     map((recipeState) => {
    //       return recipeState.recipes;
    //     })
    //   )
    //   .subscribe((recipes) => {
    //     this.recipes = recipes;
    //   });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
