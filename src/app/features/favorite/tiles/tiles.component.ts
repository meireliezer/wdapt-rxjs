import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit {

  public faEdit = faEdit;
  public faTrash = faTrash;
  public favorites$: Observable<IFavoriteWebSite[]>;

  constructor(private favoritesService: FavoritesService) {
    this.favorites$ = this.favoritesService.favorites$;
   }

  ngOnInit() {
  }

}
