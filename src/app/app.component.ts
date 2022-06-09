import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, ValidationService]
})
export class AppComponent implements OnInit {

  constructor(public appService: AppService) {}

  ngOnInit(): void {
  }

}
