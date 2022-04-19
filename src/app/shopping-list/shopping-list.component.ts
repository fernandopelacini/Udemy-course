import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/Models/ingredient.model';
import { ShoppingService } from '../shared/shopping.service';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // ingredients!: Ingredient[];

ingredients: Observable<{ingredients: Ingredient[]}> | any;

// private subscriptions! : Subscription;
  constructor(private shoppingService: ShoppingService,
    private store: Store<fromApp.AppState>) { }
//el tipo de store tiene que tener el mismo nombre que el definido en el appModule.ts
//El nombre interno, en este caso ingredients, tiene que estar escrito igual que como se puso en el estado del Reducer.


  ngOnInit(): void {
    //Trae el estado inicial en este caso es la linea 11 del shopping list reducer.
    this.ingredients= this.store.select('shoppingList');
  //   this.ingredients = this.shoppingService.getIngredients();
  // this.subscriptions =  this.shoppingService.ingredientsChanged
  //     .subscribe(
  //       (data: Ingredient[]) => {
   //         this.ingredients = data;
  //       }
  //     );
  }

ngOnDestroy(){
  this.shoppingService.ingredientsChanged.unsubscribe();
  // this.subscriptions.unsubscribe();
}

onEditItem(index: number){
  //  this.shoppingService.startedEditing.next(index);
  this.store.dispatch(new ShoppingListActions.StartEdit(index));
}

}
