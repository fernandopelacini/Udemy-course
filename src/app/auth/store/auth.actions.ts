import { Action } from "@ngrx/store";
// import {IAuthData} from '../entities/iAuth.data';

export const LOGIN_START = '[Auth] LOGIN_START';
export const AUTHENTICATE_SUCCESS = '[Auth] LOGIN';
export const AUTHENTICATE_FAIL = '[Auth] LOGIN_FAIL';
export const LOGOUT = '[Auth] LOGOUT';
export const AUTH_START = '[Auth] AUTH_START';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';


export class AuthenticateSuccess implements Action {
  readonly type:string = AUTHENTICATE_SUCCESS;

  constructor(public payload: {
    email: string,
    userId: string, token: string, expirationDate: Date
  }) { }
  //  constructor(public payload: IAuthData) { }
}

export class Logout implements Action {
  readonly type:string = LOGOUT;
}

export class LoginStart implements Action {
  readonly type:string = LOGIN_START;
  constructor(public payload: { email: string, password: string }) { }
}

export class AuthenticateFails implements Action {
  readonly type:string = AUTHENTICATE_FAIL;
  constructor(public payload: string) { }
}

export class SignUpStart implements Action {
  readonly type:string = AUTH_START;
  constructor(public payload: { email: string, password: string }) { }
}

export class ClearError implements Action {
  readonly type:string = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type:string = AUTO_LOGIN;
}

export type AuthActions = AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFails
  | SignUpStart
  | ClearError
  | AutoLogin;
