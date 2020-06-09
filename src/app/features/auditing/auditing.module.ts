import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditingComponent } from './auditing/auditing.component';
import { AuditingRoutingModule } from './auditing-routing.module';



@NgModule({
  declarations: [
    AuditingComponent
  ],
  imports: [
    CommonModule,
    AuditingRoutingModule
  ]
})
export class AuditingModule { }
