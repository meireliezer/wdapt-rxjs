import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { Observable } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { GeneralDialogComponent, IGeneralDialogData } from 'src/app/share/general-dialog/general-dialog/general-dialog.component';
import { FilterService } from '../services/filter.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {

  public favorites$: Observable<IFavoriteWebSite[]>;
  public filter$: Observable<string>;
  public faEdit = faEdit;
  public faTrash = faTrash;

  constructor(private favoritesService: FavoritesService,
              private dialogService:DialogService,
              private filterService:FilterService,
              private route: ActivatedRoute,
              private router: Router) {

    this.favorites$ = this.favoritesService.favorites$;
    this.filter$ = this.filterService.filter$;
   }

  ngOnInit() {
    this.route.data.subscribe(console.log)

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
      origin: 'grid'
    }

    this.router.navigate(['../', favorite.id],{ relativeTo: this.route, state:{data} });
  }
}
