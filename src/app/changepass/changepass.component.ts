import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {NotifyComponent} from '../notify/notify.component';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SharedService} from '../service/shared.service';
import {NotifyService} from '../service/notify.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  newPassword: string;
  reNewPassword: string;
  isChangePassBtnDisable = false;

  constructor(private httpService: HttpService,
              private router: Router,
              private sharedService: SharedService,
              private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.sharedService.activeLabel('profile');
    if (!this.httpService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  changePassword(passwordChangeForm: NgForm): void {
    if (this.newPassword !== this.reNewPassword){
      this.notifyService.displayAlert('alert-warning', 'Entered Passwords are not matching');
      return;
    }
    this.isChangePassBtnDisable = true;
    this.httpService.changePassword(btoa(this.newPassword)).subscribe(value => {
      this.notifyService.displayAlert('alert-success', value.response);
      this.router.navigate(['/login']);
    },
    error => {
      console.log(error);
      this.notifyService.displayAlert('alert-warning', 'Unable to change password');
      }).add( () => this.isChangePassBtnDisable = false);
  }
}
