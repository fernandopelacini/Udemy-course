import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './Models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('sugar', 500),
    new Ingredient('butter', 200)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();


  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(ingredientEdited: Ingredient, index:number) {
    this.ingredients[index] = ingredientEdited;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
