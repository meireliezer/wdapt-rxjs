import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteComponent } from './favorite.component';
import { GridComponent } from './grid/grid.component';
import { TilesComponent } from './tiles/tiles.component';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';

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
        component: GridComponent,
        data:{ a:1}, 
      },
      { 
      path: 'tiles', 
      component: TilesComponent
      },
      {
        path: ':id',
        component: FavoriteItemComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule { }
