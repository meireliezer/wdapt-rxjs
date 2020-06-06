import { Injectable,  ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private active
  private containerRef:ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver,
              private injector: Injector) {
  
                this.active = false;

  }

  public setDialogContainerRef(containerRef: ViewContainerRef){
    this.containerRef = containerRef;
    console.log('setDialogContainerRef', containerRef);
  }

  public open(comp: any){

    if(this.active){
      return;
    }

    let componentFactory = this.cfr.resolveComponentFactory(comp)
    let component = componentFactory.create(this.injector);
    console.log(component);
    this.containerRef.insert(component.hostView);
    this.active = true;

  }


  public close(){
    if(this.active === false){
      return;
    }
    this.containerRef.clear();
    this.active = false;
  }




  
}
