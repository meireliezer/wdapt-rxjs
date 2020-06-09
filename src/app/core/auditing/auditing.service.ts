import { Injectable } from '@angular/core';
import { IAuditing, AuditAction } from 'src/app/model/auditing.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';
import { MyHttpClientService } from '../my-http-client/my-http-client.service';
import { map } from 'rxjs/internal/operators/map';



@Injectable({
  providedIn: 'root'
})
export class AuditingService {



  public readonly auditing$ :Observable<IAuditing[]>;


  private _auditing: BehaviorSubject<IAuditing[]>

  constructor(private http: MyHttpClientService) { 
    this._auditing = new BehaviorSubject([]);
    this.auditing$ = this._auditing.asObservable();

    this.loadActionsLog();
  }


  public addWebsite(website: IFavoriteWebSite){

  }

  public editWebsite(website:IFavoriteWebSite){

  }

  public removeWebsite(website:IFavoriteWebSite){

  }

  private loadActionsLog(){
    this.http.get('api/auditing').pipe(
      map( res => res['payload'])
    )
    .subscribe(val => this._auditing.next(val));
  }
}
