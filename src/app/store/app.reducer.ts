import { ActionReducerMap } from '@ngrx/store';

//Para poner todos los reducers aqui.
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipe from '../recipes/store/recipe.reducer';


export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipe.State;
}


//Para definir mas facil despues en el AppModule en un file aparte como se hace con las routes.
export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipe.recipeReducer
}
