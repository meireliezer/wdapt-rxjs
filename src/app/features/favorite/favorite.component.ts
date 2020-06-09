import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FavoritesService } from './services/favorites.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { fromEvent } from 'rxjs';
import { debounce, debounceTime, throttleTime, map, distinctUntilChanged } from 'rxjs/operators';
import { FilterService } from './services/filter.service';


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

  @ViewChild('websiteFilter', {read:ElementRef, static: true})
  public websiteFilterElem:ElementRef;

  constructor(private favoritesService: FavoritesService,
              private dialogService: DialogService, 
              private filterService: FilterService) {
  }

  ngOnInit() {       
    console.log(this.websiteFilterElem);
    fromEvent(this.websiteFilterElem.nativeElement, 'keyup').pipe(
      debounceTime(350),
      map( (keyboardEvent :KeyboardEvent ) => (<any>(keyboardEvent.target)).value.trim()),
      distinctUntilChanged() 
    )
    .subscribe( val =>
      this.filterService.setFilter(val)
    );
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
