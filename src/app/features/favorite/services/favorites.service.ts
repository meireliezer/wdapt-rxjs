import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';

import { MyHttpClientService } from 'src/app/core/my-http-client/my-http-client.service';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { isNgTemplate } from '@angular/compiler';


@Injectable() 
export class FavoritesService {

  public readonly favorites$: Observable<IFavoriteWebSite[]>;
  private _subject: BehaviorSubject<IFavoriteWebSite[]>;

  constructor(private http: MyHttpClientService) { 
    this._subject = new BehaviorSubject<IFavoriteWebSite[]>([]);
    this.favorites$ = this._subject.asObservable();

    // Initialization
    this.loadFavorites();
  }



  public save(body): Observable<any> {
    return this.http.post('api/favorites', body).pipe(
      tap( res => {
        let list = [...this._subject.value];
        list.push(res);
        this._subject.next(list)
      })
    )  
  }

  public update(id:number, body:any):Observable<any> {
    return this.http.put('api/favorites',id,  body).pipe(
      tap( res => {
        let list = [...this._subject.value];
        let itemIdx = list.findIndex(item => item.id === id);
        list[itemIdx] = res;
        this._subject.next(list);
      })
    );
  }


  private loadFavorites(): void{

    this.http.get('api/favorites').pipe(                  
      map( res => res['payload']),
      tap( res => this._subject.next(res)),
    )
    .subscribe()
  }

}
