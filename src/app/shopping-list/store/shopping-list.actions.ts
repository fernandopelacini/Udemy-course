import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/Models/ingredient.model";

//LAS ACCIONES DEBEN SER UNICAS PORQUE SON COMPARTIDAS EN TODOS LOS REDUCERS, SI YO PONGO UN ADD_INGREDIENT EN OTRO
//REDECUR ME VA A FALLAR, POR ESO SE RECOMIENDA PONER EL NOMBRE DEL COMPONENTE ENTRE CORCHETES COMO EN ADD INGREDIENT

export const ADD_INGREDIENT = '[Shopping List] Add ingredient';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT ='START_EDIT';
export const STOP_EDIT='STOP_EDIT';

//Accciones son lo que se puede hacer con el reducer, se maneja asi con constantes por convencion.
//Toda accion tiene que implementar un Type

export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;
  // payload!: Ingredient; //puede ser cualquier nombre, no necesariamente payload

  constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) { }
}

export class DeleteIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;
}

export class UpdateIngredient implements Action {
  readonly type: string = UPDATE_INGREDIENT;
  constructor(public payload:  Ingredient ) { }
}

export class StartEdit implements Action{
  readonly type: string = START_EDIT;
  constructor(public payload: number) { }
}


export class StopEdit implements Action {
  readonly type: string = STOP_EDIT;
}

//Para soportar facilmente las type de Acciones que puede recibir el reducer.
export type ShoppingListActions = AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;

