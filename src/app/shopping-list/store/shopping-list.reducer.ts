import { Ingredient } from 'src/app/shared/model/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomato', 2)],
};

export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payLoad.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payLoad.newIngredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payLoad.index] = updatedIngredient;

      return { ...state, ingredients: updatedIngredients };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payLoad;
        }),
      };

    default:
      return state;
  }
}
