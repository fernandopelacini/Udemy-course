import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';
// import { IAuthData } from './entities/iAuth.data';
import * as fromAppState from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective;
  private closeSubs!: Subscription;
  private storeSub!: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromAppState.AppState>) { }
  // constructor(private authService: AuthService, private router: Router,
  //   private componentFactoryResolver: ComponentFactoryResolver,
  //   private store: Store<fromAppState.AppState>) { }

  isLoginMode = true;
  isLoading = false;
  error!: string;
  subscriptions!: Subscription;


  ngOnInit(): void {

    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authErrorMessage;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    // this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;
    // let authObservable: Observable<IAuthData>;

    if (this.isLoginMode) {
      // authObservable = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
    }
    else {
      // authObservable = this.authService.signUp(email, password);
      this.store.dispatch(new AuthActions.SignUpStart({ email: email, password: password }))
    }

    // this.subscriptions = authObservable.subscribe(
    //   response => {
    //     console.log(response);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   }, errorResponse => {
    //     //this.error = errorResponse;
    //     this.showErrorAlert(errorResponse);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  private showErrorAlert(message: string) {
    //Para genera componentes de forma dinamica, se necesita el FactoryResolver.
    //Esto genera un factory que sabe como crear componentes del tipo indicado, no es el componente en si.
    const componentAlertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();  //para limpiar cualquier renderizado que tenga ese componente.

    const componentRef = hostViewContainerRef.createComponent(componentAlertFactory);
    componentRef.instance.message = message;
    this.closeSubs = componentRef.instance.close.subscribe(() => {
      this.closeSubs.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  onCloseModal() {
    // this.error = '';
    this.store.dispatch(new AuthActions.ClearError());
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.closeSubs.unsubscribe();
    this.storeSub.unsubscribe();
  }
}
