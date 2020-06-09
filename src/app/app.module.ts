import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { AddDialogComponent } from './features/favorite/dialogs/add-dialog/add-dialog.component';
import { EditDialogComponent } from './features/favorite/dialogs/edit-dialog/edit-dialog.component';
import { GeneralDialogComponent } from './share/general-dialog/general-dialog/general-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    AddDialogComponent,
    EditDialogComponent,
    GeneralDialogComponent,

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    GeneralDialogComponent
  ],
})
export class AppModule { }
