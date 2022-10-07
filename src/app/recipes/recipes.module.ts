import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [
    RecipeStartComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
  ],
  exports: [
    RecipeStartComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
  ],
  // RouterModule: to fix router-outlet errors
  // .forRoot() is used only once, and use .forChild() which merges into the root route

  // template statements i.e. ngIf, ngFor etc are part of the BrowserModule
  // BrowserModule is only imported once cause it also takes care of the
  // application startup.
  // CommonModule provides all the template statements i.e. ngIf, ngFor etc

  // ReactiveFormsModule: To enable ReactiveForm template methods in the template
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {}
