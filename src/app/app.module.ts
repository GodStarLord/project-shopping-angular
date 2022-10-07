import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { DropdownDirective } from './shared/directive/dropdown.directive';
import { PlaceHolderDirective } from './shared/directive/placeholder.directive';

import { ShoppingListService } from './shopping-list/service/shopping-list.service';
import { RecipeService } from './recipes/service/recipe.service';
import { AuthInterceptor } from './auth/service/auth-interceptor.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/component/spinner/spinner.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/component/alert/alert.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { RecipesModule } from './recipes/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    AuthComponent,
    SpinnerComponent,
    AlertComponent,

    // Directives
    DropdownDirective,
    PlaceHolderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,

    RecipesModule,
  ],
  providers: [
    // Services
    ShoppingListService,
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  // This property is deprecated in latest Angular
  // we can ommit this, and Angular will take care about entryComponents
  entryComponents: [AlertComponent],
})
export class AppModule {}
