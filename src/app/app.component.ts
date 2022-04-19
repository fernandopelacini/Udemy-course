import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromAppState from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor(private authService:AuthService, private store: Store<fromAppState.AppState>){}

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
  }
  title = 'Udemy-course';

 selectedMenu:string = 'recipe'; //default menu

  // onNavigate(clickedMenu: string){
  //    this.selectedMenu= clickedMenu;
  // }

}
