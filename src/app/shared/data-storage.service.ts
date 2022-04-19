import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe-list/Models/recipe.model';
import { RecipeService } from './recipe.service';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromAppStore.AppState>) { }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    // console.log('grabando recipes');
    // console.log(recipes);
    this.http.put(environment.firebaseUrl + 'recipes.json', recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {

    //  return this.http.get<Recipe[]>(this.firebaseUrl + 'recipes.json')
    //  .pipe( map(recipes =>{
    //    return recipes.map
    //  }))

    return this.http.get<Recipe[]>(environment.firebaseUrl + 'recipes.json')
      .pipe(map(recipes => {
        //El primer map es del operador RXJS que hace un observable por cada resultado devuelto
        return recipes.map(recipe => {
          // console.log('Recipes');
          // console.log(recipe);
          //segundo map es la funcion de array, que deveulve los ingredientes si hay o un array vacio.
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
        tap(recipes => {
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
          // this.recipeService.setRecipes(recipes);
        })
      );

  }

}
