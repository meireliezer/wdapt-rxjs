import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { 
    path: 'favorites', 
    loadChildren: () => import('./features/favorite/favorite.module').then(m => m.FavoriteModule) 
  },
  { 
    path: 'auditing', 
    loadChildren: () => import('./features/auditing/auditing.module').then(m => m.AuditingModule) 
  }, 
  { 
    path: '', 
    redirectTo: 'favorites',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: HeroesComponent     
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
