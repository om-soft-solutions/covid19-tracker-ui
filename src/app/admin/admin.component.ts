import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {Router} from '@angular/router';
import {SharedService} from '../service/shared.service';
import {NotifyService} from '../service/notify.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string;
  password: string;
  role = 'lab_tech';
  ROLES = [{key: 'admin', value: 'Admin'}, {key: 'lab_tech', value: 'Lab Technician'}];
  isLoginBtnDisabled = false;

  constructor(private httpservice: HttpService,
              private router: Router,
              private sharedService: SharedService,
              private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.sharedService.loginStatus.next(false);
    this.sharedService.activeLabel('profile');
    sessionStorage.setItem('token', '');
    this.httpservice.isLoggedIn = false;
    this.httpservice.username = null;
    this.httpservice.password = null;
    this.httpservice.role = null;
  }


  authenticate(): any{
    this.isLoginBtnDisabled = true;
    this.httpservice.authenticate(this.username, this.password, this.role).subscribe(value => {
      this.httpservice.isLoggedIn = true;
      this.httpservice.username = this.username;
      this.httpservice.password = this.password;
      this.httpservice.role = this.role;
      sessionStorage.setItem('token', btoa(this.username + ':' + this.password));
      this.router.navigate(['/admin']);
    }, error => {
      console.log(error);
      const errorMessage = error?.error?.errors?.generic_error ? error?.error?.errors?.generic_error : 'Unable to Login, Please check your credentials';
      this.notifyService.displayAlert('alert-warning', errorMessage);
    }).add( () => this.isLoginBtnDisabled = false);
  }
}
