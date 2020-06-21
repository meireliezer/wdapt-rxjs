import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of, timer } from 'rxjs';
import { tap, map, shareReplay, catchError, retryWhen, delayWhen, retry, take } from 'rxjs/operators';

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


  public remove(id: number) :Observable<any>{
    return this.http.delete('api/favorites', id).pipe(
      tap( ()=> {
        let items = this._subject.value;
        let itemIdx = this._subject.value.findIndex(item => item.id === id);
        if(itemIdx !== -1){
          let newList = [...this._subject.value];
          newList.splice(itemIdx, 1);
          this._subject.next([...newList]);
        }
      })      
    )
  }

  private loadFavorites(): void{

    this.http.get('api/favorites').pipe(                  
      map( res => res['payload']),          
      // Option1  - catch and return empty data
      // catchError( err => {
      //   console.log('catchError:', err);
      //  // return of([])
      //  return of([ {
      //   id: 1,
      //   name: 'Stub',
      //   url:'stub.co.il',
      //   img: 'http://unsplash.it/300/200'
      // }])
      // }),

      // Option 2 - retry
     //retry(3),

      // // Option 3 - retryWhen
      retryWhen(errors =>
        errors.pipe(
          //log error message
          tap(val => console.log(`The error ${val} <--s`)),
          //restart in 6 seconds
          delayWhen(val => timer(3000))
        )
      ),

      tap( res => this._subject.next(res)),


    )
    .subscribe((val)=> console.log('loadFavorites got:', val), 
    (err)=> console.error('loadFavorites got error:', err),
    ()=> console.info('loadFavorites got complete'))
  }

}
