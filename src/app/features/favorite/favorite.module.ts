import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { FavoriteComponent } from './favorite.component';
import { GridComponent } from './grid/grid.component';
import { TilesComponent } from './tiles/tiles.component';
import { FavoritesService } from './services/favorites.service';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';


@NgModule({
  declarations: [
    FavoriteComponent,
    GridComponent,
    TilesComponent,
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FavoriteRoutingModule,
    ReactiveFormsModule

  ],
  providers: [
    FavoritesService
  ]
})
export class FavoriteModule { }
