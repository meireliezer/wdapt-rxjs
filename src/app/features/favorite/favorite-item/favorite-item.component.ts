import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit, OnDestroy {

  public  favorite;
  private  backTo: string;

  constructor(private route:ActivatedRoute,
              private router: Router) { 
    let navigation =this.router.getCurrentNavigation();
     if(navigation && navigation.extras && navigation.extras.state && navigation.extras.state.data) {
         this.favorite = this.router.getCurrentNavigation().extras.state.data.favorite;
       this.backTo = this.router.getCurrentNavigation().extras.state.data.origin;  
     } else {
      this.router.navigate(['../grid'], {relativeTo: this.route});
     }
  
  }

  ngOnInit() {    
  }

  ngOnDestroy(): void {
  }

  public back(){
    this.router.navigate(['../', this.backTo], {relativeTo: this.route});
  }


}
