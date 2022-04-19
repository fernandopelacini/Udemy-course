import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromAppState from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subs!: Subscription;
  constructor(private dataService: DataStorageService, private authService: AuthService, private store: Store<fromAppState.AppState>) { }
  isLogged = false;

  ngOnInit(): void {
    // this.subs = this.authService.user.subscribe(data => {
    this.subs = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(
        data => {
          this.isLogged = !data ? false : true;
        });
  }
  onSaveData() {
    this.dataService.storeRecipes();
  }

  onFetchData() {
    this.subs = this.dataService.fetchRecipes().subscribe();
  }

  onLogOut() {
    // this.authService.logOut();
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
