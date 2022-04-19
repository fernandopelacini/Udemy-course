import { UserModel } from "../entities/user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: UserModel;
  authErrorMessage: string;
  loading: boolean
}

const initialState: State = {
  user: null!,
  authErrorMessage: '',
  loading: false
}
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  //ES SUPEER IMPORTANTE COPIAR SIEMPRE EL ESTADO INICIAL Y PONER UN DEFAULT EN EL SWITCH,
  //PORQUE LOS DISPATCH ALCANZAN A TODOS LOS REDUCERS, NO IMPORTA QUIEN LO LLAME,
  //ES DECIR SI HAGO DISPATCH DE AUTH LE LLEGA TAMBIEN AL DE SHOPPING LIST y VICE VERSA
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new UserModel(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user: user,//el user: es la propiedad definida en el estado.
        authErrorMessage: '',
        loading: false
      };

    case AuthActions.LOGOUT:

      return {
        ...state,
        user: null!,
        authErrorMessage: ''
      };

    case AuthActions.LOGIN_START:
    case AuthActions.AUTH_START:
      return {
        ...state,
        authErrorMessage: '',
        loading: true
      }

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null!,
        authErrorMessage: action.payload,
        loading: false
      }

      case AuthActions.CLEAR_ERROR:
        return{
          ...state,
          authErrorMessage: ''
        }
    default:
      return state;
  }


}
