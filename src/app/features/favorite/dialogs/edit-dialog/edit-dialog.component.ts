import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IDialog } from 'src/app/model/dialog.interface';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { IFavoriteWebSite } from 'src/app/model/favorite-website.interface';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent implements OnInit, IDialog {
  
  public form: FormGroup;
  public onOk$: Observable<any>;
  public onCancel$: Observable<any>;
  public inProgress: boolean;


  public data:IFavoriteWebSite;

  private _onOk: Subject<any>;
  private _onCancel: Subject<any>;

  constructor(private formBuilder: FormBuilder) {
    this._onOk = new Subject();
    this.onOk$ = this._onOk.asObservable();

    this._onCancel = new  Subject();
    this.onCancel$ = this._onCancel.asObservable();

    this.inProgress = false;
   }


  ngOnInit() {
    this.form = this.formBuilder.group({
      website: new FormControl(this.data.name, [Validators.required]),
      url: new FormControl(this.data.url, [Validators.required])
    });

  }

  public onCancel(){
    this._onCancel.next();
  }

  public onSubmit(){    
    this.inProgress = true;
    this._onOk.next(this.form.value);
  }

}
