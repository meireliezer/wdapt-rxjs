import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './services/favorites.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';


export interface IDialogConfig {
  input?: any;
  output?: any;
}


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  public faSearchIcon = faSearch;

  constructor(private favoritesService: FavoritesService,
              private dialogService: DialogService) {
  }

  ngOnInit() {      
  }

  public addWebsite(){


    this.dialogService.open(AddDialogComponent).subscribe( val => {

      if(val === null){
        this.dialogService.close();
      } else {
        this.favoritesService.save({
                    name: val.website,
                    url: val.url
                  })
        .subscribe( 
          ()=> this.dialogService.close()
          );

      }

    })

  }

}
