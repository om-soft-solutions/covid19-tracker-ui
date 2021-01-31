import {Component, OnInit} from '@angular/core';
import {Patient} from '../models/patient';
import {HttpService} from '../service/http.service';
import {NgForm} from '@angular/forms';
import {Hospital} from '../models/hospital';
import {Router} from '@angular/router';
import {SharedService} from '../service/shared.service';
import {NotifyService} from '../service/notify.service';

declare var jQuery: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  patient: Patient = {gender: 'male'} as Patient;

  errors: any;
  isRegisterDisabled = false;
  hospitalsList: Hospital[];

  constructor(private http: HttpService,
              private sharedService: SharedService,
              private notifyService: NotifyService) {
  }

  ngOnInit(): void {
    this.sharedService.activeLabel('register');
    this.http.getHospitals().subscribe(value => {
      this.hospitalsList = value.response;
    }, error => {
      console.log(error);
      this.notifyService.displayAlert( 'alert-warning', 'unable to get hospitals list, please refresh page or contact administrator');
    });
  }

  registerTest(registerForm: NgForm): void {
    this.patient.applicationId = null;
    this.errors = null;
    this.isRegisterDisabled = true;
    this.patient.hospital = this.hospitalsList.find(value => value.hospitalCode === this.patient.hospital1);
    this.http.registerTest(this.patient).subscribe(value => {
        this.patient = value.response;
        jQuery('#registrationModal').modal('toggle');
        jQuery('#registrationModal').on('hide.bs.modal', e => {
          registerForm.resetForm({gender: 'male'});
        });
    },
      error => {
      const errorMessage = error?.error?.errors?.generic_error ? error?.error?.errors?.generic_error : 'You are unable to register for test, please check with administrator';
      this.notifyService.displayAlert('alert-warning', errorMessage);
      }).add(() => this.isRegisterDisabled = false);
  }
}
