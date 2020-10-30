import { Component, OnInit } from '@angular/core';
import {Observable, timer} from "rxjs";
import {finalize, map, take} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  mobileOrEmail: any;
  isOTPReceived: boolean;
  errors: boolean;
  regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isTimerOn: boolean;
  timer$: Observable<Number>;

  constructor() { }

  ngOnInit(): void {
  }

  getOtp() {
    if(this.validate()){
        this.isTimerOn=true;
        this.startTimer();
        // TODO:will make a http call
        this.isOTPReceived=true;
    }else {
      this.errors=true;
    }
  }

  private validate():boolean{
      if(this.mobileOrEmail && ((!isNaN(this.mobileOrEmail) && this.mobileOrEmail.length ==10) || this.regexp.test(this.mobileOrEmail))){
        return true;
      }
    return false;
  }

  reset(event: KeyboardEvent) {
    let isValid = this.validate();
    if(!isValid){
      this.errors = true;
      this.isOTPReceived=false;
    }else {
      this.errors = false;
    }
  }

  private startTimer() {
    let count = 25
    this.timer$ = timer(0,1000).pipe(
      take(count),
      map(()=>--count),
      finalize(() => {this.isTimerOn=false})
    )
  }
}
