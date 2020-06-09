import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {


  public filter$: Observable<string>
  private _filter: BehaviorSubject<string>;

  constructor() { 
    this._filter = new BehaviorSubject('');
    this.filter$ = this._filter.asObservable();
  }

  public setFilter(filter: string){
    this._filter.next(filter);
  }

}
