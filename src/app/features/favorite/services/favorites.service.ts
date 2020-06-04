import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { MyHttpClientService } from 'src/app/core/my-http-client/my-http-client.service';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';


@Injectable() 
export class FavoritesService {

  public readonly favorites$: Observable<IFavoriteWebSite[]>;
  private _subject: BehaviorSubject<IFavoriteWebSite[]>;

  constructor(private http: MyHttpClientService) { 
    this._subject = new BehaviorSubject<IFavoriteWebSite[]>([]);
    this.favorites$ = this._subject.asObservable();
  }


  public loadFavorites(): void{

    this.http.get('api/favorites').pipe(      
      map( res => res['payload']),
      tap( res => this._subject.next(res))
    )
    .subscribe()
  }
}
