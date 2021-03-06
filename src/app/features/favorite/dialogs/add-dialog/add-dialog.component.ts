import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck, ApplicationRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { IDialog } from 'src/app/model/dialog.interface';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddDialogComponent implements OnInit, IDialog {

  public form: FormGroup;
  public readonly onOk$: Observable<any>;
  public readonly onCancel$: Observable<any>;
  public inProgress: boolean;

  private _onOk: Subject<any>;
  private _onCancel: Subject<any>;

  constructor(private formBuilder: FormBuilder) {
                
   
    this._onOk = new Subject();
    this.onOk$ = this._onOk.asObservable();

    this._onCancel = new Subject();
    this.onCancel$ = this._onCancel.asObservable();

    this.inProgress = false;    
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
    this.inProgress =  true;
    this._onOk.next(this.form.value);    
  }

}
