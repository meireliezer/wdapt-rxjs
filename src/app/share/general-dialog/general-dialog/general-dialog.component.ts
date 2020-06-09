import { Component, OnInit } from '@angular/core';
import { IDialog } from 'src/app/model/dialog.interface';
import { Subject } from 'rxjs';

export interface IGeneralDialogData {
  title: string;
  content: string;
  okBtnLabel: string;
  cancelBtnLabel: string;
}

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.css']
})
export class GeneralDialogComponent implements OnInit, IDialog {
  
  public readonly onOk$: import("rxjs").Observable<any>;
  public readonly onCancel$: import("rxjs").Observable<any>;
  public data: IGeneralDialogData;


  private _onOk: Subject<any>;
  private _onCancel: Subject<any>;


  constructor() { 
    this._onOk = new Subject();
    this.onOk$ = this._onOk.asObservable();

    this._onCancel = new Subject();
    this.onCancel$ = this._onCancel.asObservable();
  }

  ngOnInit() {
  }

  public onOk(){
    this._onOk.next(true);
  }

  public onCancel(){
    this._onCancel.next();
  }

}
