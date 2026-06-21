import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
    standalone: false
})
export class NavBarComponent  implements OnInit {
  isVisible = false;
  user: any;
  responseData: any;

  constructor(private router: Router,private dataService : DataService ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart ) {
        this.isVisible = event.url !== '/login';
      }
    });

    this.dataService.responseData$.subscribe(data => {
      this.responseData = data;
      this.user=data;
    });

  }
}
