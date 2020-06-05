import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  public form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      website: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required])
    });
  }


  public onCancel(){
    console.log('cancel')
  }

  public onSubmit(){
    console.log('submit');
  }

}
