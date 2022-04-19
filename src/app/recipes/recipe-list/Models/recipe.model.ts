import { Ingredient } from "src/app/shared/Models/ingredient.model";

export class Recipe{
public id: number;
public name: string;
public description: string;
public imagePath:string;
public ingredients!: Ingredient[];

constructor(id:number,name:string,descrp:string,imagePath:string, ingredients: Ingredient[]){
  this.id=id;
  this.name=name;
  this.description=descrp;
  this.imagePath=imagePath;
  this.ingredients= ingredients;
};
}

