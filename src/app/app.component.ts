import { Component } from '@angular/core';
import {HttpService} from "./service/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid-status';
  httpService: HttpService;

  constructor(private httpService1: HttpService) {
      this.httpService = httpService1;
  }
}
