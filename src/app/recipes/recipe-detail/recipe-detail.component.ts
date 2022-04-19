import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/Models/ingredient.model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { ShoppingService } from 'src/app/shared/shopping.service';
import { Recipe } from '../recipe-list/Models/recipe.model';
import * as fromAppstate from '../../store/app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  receipe!: Recipe;
  receipeId: number = 0;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
    private router: Router, private store: Store<fromAppstate.AppState>) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.receipeId = Number(params['id']);
        // this.receipe = this.recipeService.getRecipe(this.receipeId);
        this.store.select('recipes')
          .pipe(
            map(recipeState => {
              return recipeState.recipes.find((recipe, index) => {
                return index === this.receipeId;
              });
            })
          )
          .subscribe(data  => {
            this.receipe = data;
          })
      });

  }
  onToShoppingList(ingredients: Ingredient[]) {
    this.recipeService.addIngredientsToShoppingList(ingredients);
    // this.selectedReceipe.emit(ingredients);
  }

  OnDeleteRecipe() {
    this.recipeService.deleteRecipe(this.receipeId);
    this.router.navigate(['/recipes']); //Esto no hace falta porque ya esta en esa ruta, { relativeTo: this.route });
  }

}
