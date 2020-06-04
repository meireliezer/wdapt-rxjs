import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteComponent } from './favorite.component';
import { GridComponent } from './grid/grid.component';
import { TilesComponent } from './tiles/tiles.component';

const routes: Routes = [
  { 
    path: '', 
    component: FavoriteComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'grid'
      },
      { 
        path: 'grid', 
        component: GridComponent
      },
      { 
      path: 'tiles', 
      component: TilesComponent
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule { }
