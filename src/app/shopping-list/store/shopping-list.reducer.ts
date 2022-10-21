import { Ingredient } from 'src/app/shared/model/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomato', 2)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function ShoppingListReducer(
  state: State = initialState,
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

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payLoad,
        editedIngredient: { ...state.ingredients[action.payLoad] },
      };

    case ShoppingListActions.STOP_EDIT:
      return { ...state, editedIngredientIndex: -1, editedIngredient: null };

    default:
      return state;
  }
}
