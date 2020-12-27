import { Component, OnInit } from '@angular/core';
import {Observable, timer} from "rxjs";
import {finalize, map, take} from "rxjs/operators";
import {HttpService} from "../service/http.service";
import {Patient} from "../models/patient";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  mobileOrEmail: any;
  isOTPReceived: boolean;
  errors: Record<string, string>;
  regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isTimerOn: boolean;
  timer$: Observable<Number>;
  otp: number;
  patientList: Patient[];
  application: any;
  isValid: boolean;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  getOtp() {
    this.isTimerOn=false;
    this.isOTPReceived=false;
    this.patientList=null;
    this.errors=null;
    if(this.validate()){
        this.httpService.getOtp(this.application).subscribe(
          success => {
            this.isTimerOn=true;
            this.startTimer();
            this.isOTPReceived=true;
          },
          error => {
            console.log(error);
            if(error?.error?.errors){
              this.errors = error.error.errors;
            }
          });
    }
  }

   validate():boolean{
      if(this.application && ((!isNaN(this.application) && this.application.length ==10) || this.regexp.test(this.application))){
        this.isValid=true;
        return true;
      }else{
        this.isValid=false;
      }
    return false;
  }

  private startTimer() {
    let count = 25
    this.timer$ = timer(0,1000).pipe(
      take(count),
      map(()=>--count),
      finalize(() => {this.isTimerOn=false})
    )
  }

  getDetails() {
    this.httpService.getPatientDetails(this.mobileOrEmail,this.otp).subscribe(value => {
        this.patientList = value;
    });
  }

  searchForPatient() {
    this.httpService.searchForPatient(this.application,this.otp).subscribe(
      data => {
        console.log(data.response);
        this.patientList = data.response;
      },
      error => {
        console.log(error);
        if(error?.error?.errors) {
          this.errors=error.error.errors;
        }else{
          this.errors = {"generic_error":"Unable to perform operation. please check with administrator"}
        }
      }
    );
  }
}
