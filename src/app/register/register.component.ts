import { Component} from '@angular/core';
import {Patient} from "../models/patient";
import {HttpService} from "../service/http.service";
import {NgForm} from "@angular/forms";

declare var jQuery:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  patient: Patient = new class implements Patient {
    countryCode: string = "91";
    age: number;
    applicationId: string;
    email: string;
    gender: string = "male";
    mobileNumber: string;
    name: string;
    status: string;
  };

  errors: any;
  isRegisterDisabled: boolean = false;

  constructor(private http: HttpService) {
  }

  registerTest(registerForm: NgForm) {
    this.patient.applicationId = null;
    this.errors=null;
    this.isRegisterDisabled = true;
    this.http.registerTest(this.patient).subscribe(value => {
        this.patient = value.response;
        jQuery('#registrationModal').modal('toggle');
        jQuery('#registrationModal').on('hide.bs.modal', function (e) {
          registerForm.resetForm({gender: 'male'});
        })
    },
      error => {
        if (error.error && error.error.errors) {
          this.errors = error.error.errors;
        }else{
          this.errors = {"generic_error": "You are unable to register for test, please check with administrator"}
        }
      }).add(()=> this.isRegisterDisabled = false);
  }
}
