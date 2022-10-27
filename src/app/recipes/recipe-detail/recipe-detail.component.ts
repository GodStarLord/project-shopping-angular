import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../model/recipe.model';

import { RecipeService } from '../service/recipe.service';

import { AppState } from 'src/app/store/app.reducer';
import * as RecipeActions from './../store/recipe.actions';

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
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    //  This line will only work when we first time load the component
    //  const id = this.route.snapshot.params['id'];

    //  This subscribs to the route and reacts to the change in value
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   // this.recipe = this.recipeService.getRecipe(this.id);
    //   this.store
    //     .select('recipes')
    //     .pipe(
    //       map((recipeState) =>
    //         recipeState.recipes.find((recipe, index) => {
    //           return index === this.id;
    //         })
    //       )
    //     )
    //     .subscribe((recipe) => (this.recipe = recipe));
    // });

    // Converting the above code into one big observable
    this.route.params
      .pipe(
        map((params: Params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipeState) =>
          recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          })
        )
      )
      .subscribe((recipe) => (this.recipe = recipe));
  }

  onAddToShopingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
