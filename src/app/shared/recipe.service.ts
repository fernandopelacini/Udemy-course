import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe-list/Models/recipe.model';
import { Ingredient } from './Models/ingredient.model';
// import { ShoppingService } from './shopping.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // private recipes: Recipe[] = [new Recipe(0, 'Stew', 'A description test',
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb6V02EA3M609Cp9WgwHAhd1qNsUpernQdkw&usqp=CAU', [
  //   new Ingredient('meat', 500), new Ingredient('carrot', 1), new Ingredient('soup', 1200)
  // ]),
  // new Recipe(1, 'Donas Summer', 'Sugar to stop your heart',
  //   'https://www.bing.com/th?id=OIP.dPZdZXSz0gUhONo6iJkr2QHaHa&w=164&h=170&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2',
  //   [new Ingredient('flavor', 3000), new Ingredient('sugar', 125), new Ingredient('baking podwer', 2)])];
  private recipes: Recipe[] = [];

  recipesChanged = new Subject<Recipe[]>();

  constructor( private store: Store<fromApp.AppState>
    // ,private shoppingService: ShoppingService,
    ) { }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.refreshRecipes();
  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number): any {
    return this.recipes.find(x => x.id === id);
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //this.shoppingService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(newRecipe: Recipe) {
    newRecipe.id = this.recipes.length;
    // console.log('NEW RECIPE');
    // console.log(newRecipe);
    this.recipes.push(newRecipe);
    this.refreshRecipes();
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    // console.log('Update recipe');
    // console.log(updatedRecipe);
    this.refreshRecipes();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.refreshRecipes();
  }

  private refreshRecipes() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
