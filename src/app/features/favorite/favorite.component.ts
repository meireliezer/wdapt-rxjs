import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FavoritesService } from './services/favorites.service';
import { faSearch, faTable, faTh } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { fromEvent, Subscription } from 'rxjs';
import {  debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { FilterService } from './services/filter.service';
import { Router, NavigationEnd } from '@angular/router';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';


export interface IDialogConfig {
  input?: any;
  output?: any;
}


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit, OnDestroy {


  public faSearchIcon = faSearch;
  public faGridIcon = faTable;
  public faTilesIcon = faTh;
  public isGridView = false;

  @ViewChild('websiteFilter', {read:ElementRef, static: true})
  public websiteFilterElem:ElementRef;

  private subscription: Subscription;


  constructor(private router: Router,
              private favoritesService: FavoritesService,
              private dialogService: DialogService, 
              private filterService: FilterService) {
  }
 

  ngOnInit() {       
    
    this.subscription = fromEvent(this.websiteFilterElem.nativeElement, 'keyup').pipe(
      debounceTime(350),
      map( (keyboardEvent :KeyboardEvent ) => (<any>(keyboardEvent.target)).value.trim()),
      distinctUntilChanged() 
    )
    .subscribe( val =>
      this.filterService.setFilter(val)
    );


    this.isGridView  = this.router.url.indexOf('grid') !== -1;      
    let subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd )
    )
    .subscribe((event:NavigationEnd)=> {
      this.isGridView  = (event.url.indexOf('grid')!== -1);
    });
    this.subscription.add(subscription);

  }


  ngOnDestroy(): void {
   this.subscription.unsubscribe();
   this.filterService.setFilter('');
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
