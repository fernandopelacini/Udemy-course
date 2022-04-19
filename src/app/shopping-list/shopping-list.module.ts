import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent],
  imports: [
    RouterModule,
    CommonModule,
    ShoppingListRoutingModule,
    FormsModule
  ],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent
  ]
})
export class ShoppingListModule { }
