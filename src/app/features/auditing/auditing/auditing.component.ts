import { Component, OnInit } from '@angular/core';
import { IAuditing, AuditType } from 'src/app/model/auditing.interface';
import { Observable } from 'rxjs/internal/Observable';
import { AuditingService } from 'src/app/core/auditing/auditing.service';

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit {

  public readonly auditing$: Observable<IAuditing[]>;


  constructor(private auditingService: AuditingService) {
    this.auditing$ = auditingService.auditing$;
   }

  ngOnInit() { 
    this.auditingService.loadActionsLog();
  }

  public actionToText(auditType: AuditType){
    switch (auditType){
      case AuditType.Add:
        return 'Website was added';
      case AuditType.Edit:
        return 'Website was edited';
      case AuditType.Delete:
        return 'Website was removed';
      default:
        return '';
    }
  }

}
