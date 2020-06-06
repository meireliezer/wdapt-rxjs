import { Injectable,  ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { IDialogConfig } from 'src/app/features/favorite/favorite.component';
import { IDialog } from 'src/app/model/dialog.interface';
import { Observable, Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  

  private _active
  private _containerRef:ViewContainerRef;
  private _result: Subject<any>;
  

  constructor(private cfr: ComponentFactoryResolver,
              private injector: Injector) {
  
                this._active = false;
                this._result = new Subject();                                
  }

  public setDialogContainerRef(containerRef: ViewContainerRef){
    this._containerRef = containerRef;
    console.log('setDialogContainerRef', containerRef);
  }

  public open(comp: any): Observable<any>{

    if(this._active){
      return;
    }

    let componentFactory = this.cfr.resolveComponentFactory(comp)
    let component = componentFactory.create(this.injector);
    console.log(component);
    (<IDialog>component.instance).onCancel$.subscribe( ()=> this._result.next(null) );
    (<IDialog>component.instance).onOk$.subscribe( val => this._result.next( val ));;
    this._containerRef.insert(component.hostView);
    this._active = true;

    return this._result.asObservable();

  }


  public close(){
    if(this._active === false){
      return;
    }
    this._containerRef.clear();
    this._active = false;
  }




  
}
