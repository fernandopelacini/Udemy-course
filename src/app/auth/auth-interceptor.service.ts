import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromAppState from '../store/app.reducer';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromAppState.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //return this.authService.user.pipe(
    return this.store.select('auth').pipe(
    take(1),
    map(authState => {
      return authState.user
    }),
    exhaustMap(user => {

        if (!user) {
          //Para las request de login y signup que vienen sin user.
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token!)
        });
        return next.handle(modifiedReq);
      })
    )


  }
}
