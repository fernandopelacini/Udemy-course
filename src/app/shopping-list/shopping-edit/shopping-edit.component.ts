import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Models/ingredient.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm!: NgForm; //Para ver variables desde el form
  subscription!: Subscription;
  editMode: boolean = false;
  // editedItemIndex: number = -1;
  editedIngredient!: Ingredient;
  constructor(private store: Store<fromApp.AppState>
    // ,private shoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    // this.subscription = this.shoppingService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedIngredient = this.shoppingService.getIngredient(index);
    //     this.shoppingForm.setValue({
    //       name: this.editedIngredient.name,
    //       amount: this.editedIngredient.amount
    //     })
    //   }
    // );

    this.subscription = this.store.select('shoppingList').subscribe(
      stateData => {
        if (stateData.editedIngredientIndex > -1) {
          // this.editedItemIndex = stateData.editedIngredientIndex;
          this.editMode = true;
          this.editedIngredient = stateData.editedIngredient;
          this.shoppingForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          })

        }
        else {
          this.editMode = false;
        }
      }
    );
  }

  onAdded(form: NgForm): void {
    const value = form.value;
    const data: Ingredient = new Ingredient(value.name, value.amount); //Son los nombres de las properties en el HTML
    (this.editMode) ? this.store.dispatch(
      new ShoppingListActions.UpdateIngredient(data))
      : this.store.dispatch(new ShoppingListActions.AddIngredient(data));
    //El metodo dispatch es el que dispara las Actions definidas junto al reducer.



    // (this.editMode) ? this.shoppingService.updateIngredient(data, this.editedItemIndex) :
    //this.shoppingService.addIngredient(data);

    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onClear(): void {
    this.shoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleted() {
    // this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
