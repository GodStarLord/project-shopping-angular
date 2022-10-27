import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../model/recipe.model';

import { AppState } from 'src/app/store/app.reducer';
import * as RecipeActions from './../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  isEditMode: boolean = false;
  recipeForm: FormGroup;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] ? true : false;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmit(): void {
    const recipeName = this.recipeForm.value['name'];
    const recipeImagePath = this.recipeForm.value['imagePath'];
    const recipeDescription = this.recipeForm.value['description'];
    const recipeIngredients = this.recipeForm.value['ingredients'];
    const newRecipe: Recipe = new Recipe(
      recipeName,
      recipeDescription,
      recipeImagePath,
      recipeIngredients
    );

    if (this.isEditMode) {
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({ index: this.id, newRecipe: newRecipe })
      );
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
    }

    this.onCancel();
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  get ingredientsControls(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (!!this.isEditMode) {
      this.subscription = this.store
        .select('recipes')
        .pipe(
          map((recipeState) =>
            recipeState.recipes.find((recipe, index) => {
              return index == this.id;
            })
          )
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeImageUrl = recipe.imagePath;
          recipeDescription = recipe.description;

          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
