import { Injectable } from '@angular/core';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { Observable, of } from 'rxjs';
import { delay, tap, take } from 'rxjs/operators'

const FAVORITE_WEBSITES:IFavoriteWebSite[] = [
  {
    id: 1,
    name: 'ynet',
    url:'ynet.co.il',
    img: ''
  },
  {
    id: 2,
    name: 'cnn',
    url:'cnn.com',
    img: ''
  },
  {
    id: 3,
    name: 'walla',
    url:'walla.co.il',
    img: ''
  },
  {
    id: 4,
    name: 'gymshark',
    url:'gymshark.com',
    img: ''
  }
]
let favoriteNextIndex = FAVORITE_WEBSITES.length + 1;





@Injectable({
  providedIn: 'root'
})
export class MyHttpClientService {

  constructor() { }



  public get(api:string): Observable<any> {
    let data  = {};
    if(api === 'api/favorites'){
      data = {
        payload: [...FAVORITE_WEBSITES]
      }
    }

    return of(data).pipe(    
      take(1),  
      tap (val => {
        console.log('get(api/favorites)', val)
      })
    );    
  }


  public post(api:string, req:any): Observable<any> {
    
    let data:IFavoriteWebSite;
    if(api === 'api/favorites'){
      data = { ...req,
              id: favoriteNextIndex,
              img: ''
       };
       ++favoriteNextIndex;
      
      FAVORITE_WEBSITES.push(data); 
    }

    return of(data).pipe(
      take(1),
      delay(Math.random()* 3000)
      
    );
  }

}
