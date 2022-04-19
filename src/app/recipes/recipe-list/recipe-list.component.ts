import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from './Models/recipe.model';
import * as fromAppStore from '../../store/app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;
  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAppStore.AppState>) { }


  ngOnInit(): void {
    // this.subscription = this.recipeService.recipesChanged.subscribe(
    // (recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // }
    this.subscription = this.store.select('recipes')
      .pipe(
        map(recipeState => recipeState.recipes)
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    // this.recipes = this.recipeService.getRecipes();
  }

  onNewReceipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
