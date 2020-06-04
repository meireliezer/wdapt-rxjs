import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wdap-rxjs';
  faCoffee = faCoffee;

  private activeSection: string;

  constructor(private activeRoute: ActivatedRoute, 
              private router: Router){  
  }


  public isActive(section: string){    
    return this.router.url.indexOf(section) !== -1;
  }
}
