import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { FavoritesService } from '../services/favorites.service';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { FilterService } from '../services/filter.service';
import { IGeneralDialogData, GeneralDialogComponent } from 'src/app/share/general-dialog/general-dialog/general-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit {

  public faEdit = faEdit;
  public faTrash = faTrash;
  public favorites$: Observable<IFavoriteWebSite[]>;
  public filter$: Observable<string>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private favoritesService: FavoritesService,
              private dialogService:DialogService,
              private filterService:FilterService) {
    this.favorites$ = this.favoritesService.favorites$;
    this.filter$ = this.filterService.filter$;
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


  public onDetail(mouseEvent:MouseEvent, favorite: IFavoriteWebSite){
    console.log(mouseEvent);
    let actionIem  =(<any>(mouseEvent.target)).closest('.float-toolbar__action');
    if(actionIem){
      mouseEvent.stopPropagation();   
      return ;
    }
        
    let data = {
      favorite: favorite,
      origin: 'tiles'
    }

    this.router.navigate(['../', favorite.id],{ relativeTo: this.route, state:{data} });
  }
}
