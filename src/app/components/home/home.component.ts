import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent {

  responseData: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.responseData$.subscribe(data => {
      this.responseData = data;
    });
  }
}
