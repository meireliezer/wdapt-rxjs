import { Component, OnInit } from '@angular/core';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { Observable } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { tap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  public favorites$: Observable<IFavoriteWebSite[]>;
  
  constructor(private favoritesService: FavoritesService) {
    this.favorites$ = this.favoritesService.favorites$;
   }

  ngOnInit() {
    
  }


  public trackByFn(favorite: IFavoriteWebSite){
    return favorite.id;
  }
}
