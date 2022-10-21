import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/model/ingredient.model';
import { ShoppingListService } from '../service/shopping-list.service';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingListReducer from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  isEditMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingListReducer.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.isEditMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.isEditMode = false;
        }
      });

    // this.subscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.isEditMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.shoppingListService.getIngredient(
    //       this.editedItemIndex
    //     );
    //     this.shoppingListForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount,
    //     });
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (!this.isEditMode) {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } else {
      // this.shoppingListService.updateIngredient(
      //   this.editedItemIndex,
      //   newIngredient
      // );
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          index: this.editedItemIndex,
          newIngredient: newIngredient,
        })
      );
    }

    this.clearFormEdit();
  }

  onClear(): void {
    this.clearFormEdit();
  }

  onDelete(): void {
    this.clearFormEdit();
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(this.editedItemIndex)
    );
  }

  private clearFormEdit(): void {
    this.shoppingListForm.reset();
    this.isEditMode = false;

    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
