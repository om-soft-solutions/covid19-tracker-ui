import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../models/patient";
import {HttpService} from "../service/http.service";

declare var jQuery:any;

@Component({
  selector: 'app-adminscreen',
  templateUrl: './adminscreen.component.html',
  styleUrls: ['./adminscreen.component.css']
})
export class AdminscreenComponent implements OnInit {
  user: string;
  role: string;
  application: string;
  patientsList: Patient[];
  isSubmitDisabled: boolean = false;
  isUpdateStatusDisabled: boolean = false;
  errors: Record<string, string>;
  STATUS = [{key:"positive",value:"POSITIVE (+)"},{key:"negative","value":"NEGATIVE (-)"}]

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private http:HttpService) { }

  ngOnInit() {
    this.user = this.http.username;
    this.role = this.http.password;
    let token = sessionStorage.getItem('token');
    if(!this.user || !this.role || !token || token==''){
      sessionStorage.setItem('token','');
      this.router.navigate(['/login']);
    }
  }

  search() {
      this.errors=null;
      this.patientsList=null;
      this.isSubmitDisabled = true;
      this.http.searchById(this.application).subscribe(value => {
        this.patientsList = value.response;
      }, error => {
        this.patientsList=null;
        if(error?.error?.errors) {
          this.errors=error.error.errors;
        }else{
          this.errors = {"generic_error":"unable to perform operation. please check with administrator"}
        }
      }).add( ()=>this.isSubmitDisabled=false);
  }

  updateStatus() {
    this.errors=null;
    this.isUpdateStatusDisabled = true;
    this.http.updateStatus(this.patientsList)
      .subscribe(value => {
        this.patientsList = value.response;
        jQuery("#statusSuccessModal").modal('toggle');
      }, error => {
        if(error?.error?.errors) {
          this.errors=error.error.errors;
        }
      })
      .add(()=>this.isUpdateStatusDisabled=false);
  }
}
