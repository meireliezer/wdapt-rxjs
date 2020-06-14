import { Component, AfterViewInit, ViewChild, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from './core/dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  
  
  public title = 'wdap-rxjs';  
  public faCoffee = faCoffee;

  @ViewChild('medialog', {static:true, read:ViewContainerRef})
  dialogContainerRef: ViewContainerRef



  private activeSection: string;

  constructor(private router: Router,
              private dialogService:DialogService){  
  }
  ngAfterViewInit(): void {
    this.dialogService.setDialogContainerRef(this.dialogContainerRef)
  }


  public isActive(section: string){    
    return this.router.url.indexOf(section) !== -1;
  }
}
