import { Component, OnInit } from '@angular/core';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { Observable } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { tap, shareReplay } from 'rxjs/operators';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  public favorites$: Observable<IFavoriteWebSite[]>;
  
  constructor(private favoritesService: FavoritesService,
              private dialogService:DialogService) {
    this.favorites$ = this.favoritesService.favorites$;
   }

  ngOnInit() {
    
  }

  public onEdit(favorite:IFavoriteWebSite){
    
    console.log(favorite);
    this.dialogService.open(EditDialogComponent, favorite)
    .subscribe( val => {
      if(val===null){
        this.dialogService.close();
      } else {        
        console.log(val);
        this.favoritesService.update(favorite.id, {
          name: val.website,
          url: val.url
        })
        .subscribe( res => {
          this.dialogService.close();
        });
        
      }
    })
  }

  public onDelete(favorite:IFavoriteWebSite){
    console.log(favorite);
  }

  public trackByFn(favorite: IFavoriteWebSite){
    return favorite.id;
  }
}
