// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
import * as fromAppState from '../store/app.reducer';
// import { IAuthData } from './entities/iAuth.data';
import { UserModel } from './entities/user.model';
import * as AuthActions from './store/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user = new BehaviorSubject<UserModel | any>(null!);
  tokenExpirationTimer: any;

  // constructor(private http: HttpClient, private router: Router, private store: Store<fromAppState.AppState>) { }
  constructor(private store: Store<fromAppState.AppState>) { }

  // signUp(email: string, password: string): Observable<IAuthData> {
  //   const fullUrl = environment.baseSignUpUrl + environment.apiKey;

  //   return this.http.post<IAuthData>(fullUrl, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   })
  //     .pipe(
  //       catchError(this.handleError),
  //       tap(responseData => {
  //         this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
  //       }
  //       )
  //     );

  // }

  // login(email: string, password: string) {
  //   const fullUrl = environment.baseSignInUrl + environment.apiKey;

  //   return this.http.post<IAuthData>(fullUrl, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   })
  //     .pipe(
  //       catchError(this.handleError),
  //       tap(responseData => {
  //         this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
  //       }
  //       )
  //     );

  // }

  // logOut() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.Logout());
  //   // this.router.navigate(['/auth']);
  //   localStorage.removeItem('userToken');
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }


  // autoLogin() {
  //   const userToken: {
  //     email: string,
  //     id: string,
  //     _token: string,
  //     _tokenExpirationDate: string
  //   } = JSON.parse(localStorage.getItem('userToken')!);
  //   if (!userToken) return;

  //   const loadedUser = new UserModel(userToken.email, userToken.id, userToken._token,
  //     new Date(userToken._tokenExpirationDate));
  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     const expirationDuration = new Date(userToken._tokenExpirationDate).getTime() - new Date().getTime();
  //     this.store.dispatch(new AuthActions.AuthenticateSuccess({
  //       email: loadedUser.email,
  //       userId: loadedUser.id,
  //       token: loadedUser.token,
  //       expirationDate: new Date(userToken._tokenExpirationDate)
  //     }));
  //     this.autoLogOut(expirationDuration);
  //   }

  // }

  // private autoLogOut(expirationDuration: number) {
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logOut();
  //   }, expirationDuration);
  // }

setLogoutTime(expirationDuration: number) {
  this.tokenExpirationTimer = setTimeout(() => {
    this.store.dispatch(new AuthActions.Logout());
  }, expirationDuration);
}

clearLogoutTimer(){
  if (this.tokenExpirationTimer){
    clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer= null;
  }
}

  // private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  //   const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
  //   const user = new UserModel(email, userId, token, expirationDate);
  //   // this.user.next(user);
  //   this.store.dispatch(new AuthActions.AuthenticateSuccess({
  //     email: email,
  //     userId: userId,
  //     token: token,
  //     expirationDate: expirationDate
  //   }))
  //   this.autoLogOut(expiresIn * 1000);
  //   localStorage.setItem('userToken', JSON.stringify(user));
  // }


  // private handleError(errorResponse: HttpErrorResponse) {
  //   let errorMessage = 'An error ocurred';
  //   if (!errorResponse.error || !errorResponse.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorResponse.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'The email address is already in use by another account.';
  //       break;
  //     case 'OPERATION_NOT_ALLOWED':
  //       errorMessage = 'Password sign-in is disabled';
  //       break;
  //     case 'TOO_MANY_ATTEMPTS_TRY_LATER':
  //       errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'Invalid credentials';
  //       break;
  //     case 'USER_DISABLED':
  //       errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }

}
