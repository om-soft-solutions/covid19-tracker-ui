import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../service/shared.service';

@Component({
  selector: 'app-prevention',
  templateUrl: './prevention.component.html',
  styleUrls: ['./prevention.component.css']
})
export class PreventionComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.activeLabel('prevention');
  }

}
