import { Injectable } from '@angular/core';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { Observable, of } from 'rxjs';
import { delay, tap, take } from 'rxjs/operators'
import { IAuditing, AuditType } from 'src/app/model/auditing.interface';

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



const ACTIONS_LOG:IAuditing[] = [
  {
    id: 1,
    date: Date.now(),
    action: AuditType.Add,
    name: 'ynet',
    url:'ynet.co.il',
    
  },
  {
    id: 2,
    date: Date.now(),
    action: AuditType.Add,
    name: 'cnn',
    url:'cnn.com'
  },
  {
    id: 3,
    date: Date.now(),
    action: AuditType.Add,
    name: 'walla',
    url:'walla.co.il'
  },
  {
    id: 4,
    date: Date.now(),
    action: AuditType.Add,
    name: 'gymshark',
    url:'gymshark.com'
  }
]
let actionsLogNextIndex = ACTIONS_LOG.length + 1;


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
      };
    } else if( api === 'api/auditing'){
      data = {
        payload: [...ACTIONS_LOG]
      };
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

    this.audit(AuditType.Edit, data);

    return of(data).pipe(
      take(1),
      delay(Math.random()* 3000)
      
    );
  }


  public put(api:string, id: number, req:any): Observable<any>{

    let data;
    if(api === 'api/favorites'){
      data = FAVORITE_WEBSITES.find( item => item.id === id);      
      data = Object.assign({}, data, req);
    }

    this.audit(AuditType.Edit, data);
    
    return of(data).pipe(
      take(1),
      delay(Math.random()*3000)
    );
  }

  public delete(api:string, id: number): Observable<any> {
    if(api === 'api/favorites'){
      let index = FAVORITE_WEBSITES.findIndex(item=> item.id === id);
      let item = FAVORITE_WEBSITES[index];
      FAVORITE_WEBSITES.splice(index, 1); 
      
      this.audit(AuditType.Delete, item);
    }

    return of({}).pipe(
      take(1),
      delay(Math.random()*3000)
    );
  }


  private audit(action: AuditType, favorite: IFavoriteWebSite){
    let audit: IAuditing = {
      id: actionsLogNextIndex++,
      date: Date.now(), 
      action, 
      name:  favorite.name, 
      url: favorite.url
    }

    ACTIONS_LOG.push(audit);
    
  }

}
