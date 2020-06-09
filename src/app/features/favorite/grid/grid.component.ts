import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { Observable } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { GeneralDialogComponent, IGeneralDialogData } from 'src/app/share/general-dialog/general-dialog/general-dialog.component';




@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  public favorites$: Observable<IFavoriteWebSite[]>;
  public faEdit = faEdit;
  public faTrash = faTrash;

  constructor(private favoritesService: FavoritesService,
              private dialogService:DialogService) {
    this.favorites$ = this.favoritesService.favorites$;
   }

  ngOnInit() {
  }

  public onEdit(favorite:IFavoriteWebSite){
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
    let data:IGeneralDialogData = {
        title: 'Remove favorite website?',
        content:'This action will remove the favorite website parmanently',
        okBtnLabel:'Remove website',
        cancelBtnLabel:'Cancel'
    }
    this.dialogService.open(GeneralDialogComponent, data)
    .subscribe (
        val => {
          if(val ===  true){
            // Delete item
            this.favoritesService.remove(favorite.id)
            .subscribe(_=>  this.dialogService.close());

           
          } else {

            this.dialogService.close();
          }
        }

    )
  }

  public trackByFn(favorite: IFavoriteWebSite){
    return favorite.id;
  }
}
