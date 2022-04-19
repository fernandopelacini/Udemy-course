import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe-list/Models/recipe.model';
import * as fromAppState from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromAppState.AppState>) { }

  id: number = 0;
  editMode: boolean = false;
  recipeForm!: FormGroup;// = new FormGroup();
  subscriptions!: Subscription;

  ngOnInit(): void {
    this.subscriptions = this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.editMode = params['id'] !== undefined;
        console.log(`Params ID: ${params['id']}`);
        console.log(`Edit mode: ${this.editMode}`);
        console.log(`ID: ${this.id}`);
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName: string = '';
    let recipeImageUrl: string = '';
    let recipeDescription: string = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (this.editMode) {
      // const serviceData: Recipe = this.recipeService.getRecipe(this.id);
      this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((value, index) => {
            return index === this.id;
          })
        })
      )
        .subscribe(recipeData => {
          recipeName = recipeData.name;
          recipeImageUrl = recipeData.imagePath;
          recipeDescription = recipeData.description;
          if (recipeData['ingredients']) {
            for (let ingredient of recipeData.ingredients) {
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }))
            }
          }
        }
        );

    }
    console.log(`REcipe form: ${this.recipeForm}`)
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImageUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients

    });
    // console.log(this.recipeForm);
  }

  onSubmit(): void {
    const newRecipe: Recipe = new Recipe(this.id, this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
    );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
    else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }
  onCancel(): void {
    //this.location.back();
    //Or
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
