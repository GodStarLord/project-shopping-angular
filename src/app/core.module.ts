import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthInterceptor } from './auth/service/auth-interceptor.service';
import { RecipeService } from './recipes/service/recipe.service';
import { ShoppingListService } from './shopping-list/service/shopping-list.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}