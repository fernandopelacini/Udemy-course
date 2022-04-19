import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { IAuthData } from "../entities/iAuth.data";
import { UserModel } from "../entities/user.model";
import * as AuthActions from './auth.actions';

const fullUrl = environment.baseSignInUrl + environment.apiKey;
@Injectable()
//UN EFECTO SIEMPRE DEVUELVE UNA ACCION AL FINAL.
export class AuthEffects {
  //Se pone con el simbolo $ al final por convencion y que indique que es un Observable.
  constructor(private actions$: Actions, private http: HttpClient, private router: Router
    , private authService: AuthService) { }

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {  //switchMap Permite hacer un observable de un observable
      return this.http.post<IAuthData>(fullUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }
      ).pipe(
        tap(resData => {
          this.authService.setLogoutTime(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
        }),
        catchError(errorResponse => {
          return handleError(errorResponse)
        })
      );
    })
  );

  //Este es un efecto que no dispara un observable por eso se pone el dispatch en false
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  )


  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userToken');
      this.router.navigate(['/auth']);
    })
  )

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userToken: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userToken')!);
      if (!userToken) {
        return { type: 'DUMMY' };
      }

      const expirationDuration= new Date(userToken._tokenExpirationDate).getTime() - new Date().getTime();
      this.authService.setLogoutTime(expirationDuration);

      const loadedUser = new UserModel(userToken.email, userToken.id, userToken._token,
        new Date(userToken._tokenExpirationDate));

      if (loadedUser.token) {
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userToken._tokenExpirationDate)
        })
      }
      return { type: 'DUMMY' };
    })
  )

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.AUTH_START),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      return this.http.post<IAuthData>(fullUrl, {
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true
      }
      ).pipe(
        tap(x => {
          this.authService.setLogoutTime(+x.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
        }),
        catchError(errResponse => {
          return handleError(errResponse)
        })
      )
    }
    )
  );

}


const handleAuthentication = (expiresIn: number, email: string, localId: string, token: string) => {

  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new UserModel(email, localId, token, expirationDate);
  localStorage.setItem('userToken', JSON.stringify(user));
  new AuthActions.AuthenticateSuccess({
    email: email,
    userId: localId,
    token: token,
    expirationDate: expirationDate
  })
};
const handleError = (errorResponse: any) => {
  //TODO Error handler code
  // LOS of() SE HACEN PARA NO MATAR EL OBSERVABLE, EN UN EFFECT VIVEN POR SIEMPRE NO DEBEN MORIR
  //un OF() devuelve un observable
  let errorMessage = 'An error ocurred';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFails(errorMessage));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
      errorMessage = 'Invalid credentials';
      break;
    case 'USER_DISABLED':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
  }
  return of(new AuthActions.AuthenticateFails(errorMessage));

};
