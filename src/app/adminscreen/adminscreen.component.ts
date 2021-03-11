import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../models/patient';
import {HttpService} from '../service/http.service';
import {Hospital} from '../models/hospital';
import {User} from '../models/user';
import {NgForm} from '@angular/forms';
import {SharedService} from '../service/shared.service';
import {NotifyService} from '../service/notify.service';

@Component({
  selector: 'app-adminscreen',
  templateUrl: './adminscreen.component.html',
  styleUrls: ['./adminscreen.component.css']
})
export class AdminscreenComponent implements OnInit {
  user: string;
  password: string;
  role: string;
  application: string;
  patientsList: Patient[];
  isSubmitDisabled = false;
  isUpdateStatusDisabled = false;
  STATUS = [{key: 'positive', value: 'POSITIVE (+)'}, {key: 'negative', value: 'NEGATIVE (-)'}];
  httpService: HttpService;
  newUser: User = {} as User;
  private hospitalsList: Hospital[];
  hospital: string;
  pageHeader: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: HttpService,
              private sharedService: SharedService,
              private notifyService: NotifyService) {
    this.httpService = http;
  }

  ngOnInit(): void {
    this.sharedService.loginStatus.next(true);
    this.sharedService.activeLabel('profile');
    this.user = this.http.username;
    this.password = this.http.password;
    this.role = this.http.role;
    if (this.role !== 'admin') { this.pageHeader = 'Update Status of Tests'; }
    else { this.pageHeader = 'Add Lab Technician'; }
    const token = sessionStorage.getItem('token');
    if (!this.user || !this.password || !token || token === ''){
      sessionStorage.setItem('token', '');
      this.router.navigate(['/login']);
    }
    if (this.role === 'admin'){
      this.http.getHospitals().subscribe(value => {
        console.log(value);
        this.hospitalsList = value.response;
      }, error => {
        console.log(error);
        this.notifyService.displayAlert('alert-warning', 'unable to get hospitals list, please refresh page or contact administrator');
      });
    }
  }

  search(): void {
      this.patientsList = null;
      this.isSubmitDisabled = true;
      this.http.searchById(this.application).subscribe(value => {
        this.patientsList = value.response;
      }, error => {
        this.patientsList = null;
        const errorMessage = error?.error?.errors?.generic_error ? error.error.errors?.generic_error : 'Unable to perform search operation. !!!';
        this.notifyService.displayAlert('alert-warning', errorMessage);
      }).add( () => this.isSubmitDisabled = false);
  }

  updateStatus(): void {
    this.isUpdateStatusDisabled = true;
    this.http.updateStatus(this.patientsList)
      .subscribe(value => {
        this.patientsList = value.response;
        this.notifyService.displayAlert('alert-success', 'Patient Details updated Successfully');
      }, error => {
        const errorMessage = error?.error?.errors?.generic_error ? error.error.errors?.generic_error : 'Patient details not updated !!!';
        this.notifyService.displayAlert('alert-warning', errorMessage);
      })
      .add(() => this.isUpdateStatusDisabled = false);
  }

  createUser(userform: NgForm): void {
    const hospital1 = this.hospitalsList.find(value => value.hospitalCode === this.hospital);
    this.newUser.hospital = hospital1;
    this.http.createUser(this.newUser).subscribe(value => {
      this.notifyService.displayAlert('alert-success', 'User created Successfully');
      userform.reset();
    }, error => {
      const errorMessage = error?.error?.errors?.generic_error ? error.error.errors?.generic_error : 'Not able to create User';
      this.notifyService.displayAlert('alert-warning', errorMessage);
    });
  }
}
