import { Ingredient } from 'src/app/shared/model/ingredient.model';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomato', 2)],
};

export function ShoppingListReducer(state = initialState, action) {}
