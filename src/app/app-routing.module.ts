import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', loadChildren: () => import('./recipes/recipe.module')
      .then(m => m.RecipeModule)
  },
  {
    path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module')
      .then(m => m.ShoppingListModule)
  },
  { path: 'auth', component: AuthComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
