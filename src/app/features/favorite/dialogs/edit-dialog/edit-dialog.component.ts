import { Component, OnInit } from '@angular/core';
import { IDialog } from 'src/app/model/dialog.interface';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit, IDialog {
  
  public form: FormGroup;
  public onOk$: Observable<any>;
  public onCancel$: Observable<any>;

  private _onOk: Subject<any>;
  private _onCancel: Subject<any>;

  constructor(private formBuilder: FormBuilder) {
    this._onOk = new Subject();
    this.onOk$ = this._onOk.asObservable();

    this._onCancel = new  Subject();
    this.onCancel$ = this._onCancel.asObservable();
   }


  ngOnInit() {
    this.form = this.formBuilder.group({
      website: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required])
    });

  }

  public onCancel(){
    this._onCancel.next();
  }

  public onSubmit(){    
    this._onOk.next(this.form.value);
  }

}
