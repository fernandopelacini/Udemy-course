import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from './recipe-list/Models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorage: DataStorageService,
    private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorage.fetchRecipes();
    }
    else {
      return recipes;
    }
  }
}
