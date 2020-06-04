import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './services/favorites.service';
import { Observable } from 'rxjs';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(private favoritesService: FavoritesService) {
   }

  ngOnInit() {  
  }

}
