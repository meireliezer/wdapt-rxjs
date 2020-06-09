import { Component, OnInit } from '@angular/core';
import { IAuditing } from 'src/app/model/auditing.interface';
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
  }

}
