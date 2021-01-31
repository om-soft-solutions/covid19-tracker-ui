import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Hospital} from '../models/hospital';
import {NotifyService} from '../service/notify.service';
import {SharedService} from '../service/shared.service';

@Component({
  selector: 'app-admin-add-hospital',
  templateUrl: './admin-add-hospital.component.html',
  styleUrls: ['./admin-add-hospital.component.css']
})
export class AdminAddHospitalComponent implements OnInit {

  hospital: Hospital = {} as Hospital;
  httpService: HttpService;

  constructor(private httpService1: HttpService,
              private router: Router,
              private notifyService: NotifyService,
              private sharedService: SharedService) {
    this.httpService = httpService1;
  }

  ngOnInit(): void {
    if (!this.httpService.isLoggedIn){
      this.router.navigate(['/login']);
    }
    this.sharedService.activeLabel('profile');
  }

  addHospital(addHospitalForm: NgForm): void {
    this.httpService.addHospital(this.hospital).subscribe(value => {
      this.notifyService.displayAlert('alert-success', value.response);
      addHospitalForm.reset();
    },
      error => {
        let errorMessage = 'Unable to add hospital';
        console.log(error);
        if (error?.error?.errors){
          errorMessage = error.error.errors?.generic_error;
        }
        this.notifyService.displayAlert('alert-warning', errorMessage);
      });
  }

}
