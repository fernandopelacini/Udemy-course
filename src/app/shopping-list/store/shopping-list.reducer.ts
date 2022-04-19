import { Ingredient } from "../../shared/Models/ingredient.model";
import *  as ShoppingListActions from "./shopping-list.actions";

//Para manejar mas facil el Type cuando se injecta el store y se quiere indicar el tipo.
export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient | any,
  editedIngredientIndex: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('sugar', 500),
    new Ingredient('butter', 200)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

//Los reducer es una funcion que recibe 2 parametros, "state" y "action"
//El state es el inicial y el action es lo que actua sobre el reducer.
//Y se devulve un NUEVO ESTADO.

//No hace falta setear un estado inicial, puede ser null sino.



//ES SUPEER IMPORTANTE COPIAR SIEMPRE EL ESTADO INICIAL Y PONER UN DEFAULT EN EL SWITCH,
//PORQUE LOS DISPATCH ALCANZAN A TODOS LOS REDUCERS, NO IMPORTA QUIEN LO LLAME,
//ES DECIR SI HAGO DISPATCH DE AUTH LE LLEGA TAMBIEN AL DE SHOPPING LIST y VICE VERSA
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions) {

    //Aca van las implementaciones de las actions
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        //Se hace una copia de los originales, NUNCA NUNCA se modifica el original
        //Se puede hacer pero esta mal visto desde la practica
        ...state,
        ingredients: [...state.ingredients, action.payload]
        //Siempre se hace una copia del estado original con ...state
        //Despues se modifica la propiedad que se quiera, en este caso ingredients:
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
        ///...action.payload para que copie los items del array sino pone el array y hace un array de array
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex]; //Obtener el que se modifico nomas
      const updatedIngredient = { ...ingredient, ...action.payload }; //copia la data modificada en una variable, se copia el ingrediente
      //y despues se sobreescribe con el action.payload que conitne el dato modificado.

      const updatedIngredients = [...state.ingredients]; //Copia de los originales para no tocar el state original
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;//pongo los datos nuevos.

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      // const ingredients = [...state.ingredients];
      // ingredients.splice(action.payload,1);
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          //return igIndex !== state.editedIngredientIndex;
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
        //Linea 81 se crea un nuevo object que se copia del ingredients original para no modificarlo ahi.
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
    // break;
  }
}
