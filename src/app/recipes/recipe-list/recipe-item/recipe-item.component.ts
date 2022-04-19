import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../Models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() item!:Recipe;

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
  }

  // onClick(){
  //   this.recipeService.recipeSelected.emit(this.item);
  //   // this.selectedReceipe.emit();
  // }

}
