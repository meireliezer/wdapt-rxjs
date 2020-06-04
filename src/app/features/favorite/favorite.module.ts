import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';
import { GridComponent } from './grid/grid.component';
import { TilesComponent } from './tiles/tiles.component';


@NgModule({
  declarations: [
    FavoriteComponent,
    GridComponent,
    TilesComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule
  ]
})
export class FavoriteModule { }
