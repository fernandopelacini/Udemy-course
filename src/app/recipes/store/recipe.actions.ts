import { Action } from "@ngrx/store";
import { Recipe } from "../recipe-list/Models/recipe.model";

export const SET_RECIPES = '[Recipes]  Set recipes';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;

  constructor(public payload: Recipe[]){}
}


export type RecipesActions = SetRecipes;
//LoS GET del service no se reemplazan con actions
//Para eso se usa el SELECT del store.
