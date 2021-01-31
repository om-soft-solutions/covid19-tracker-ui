import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {HttpService} from './service/http.service';
import {SharedService} from './service/shared.service';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'covid-status';
  httpService: HttpService;
  isLoggedIn = false;

  constructor(private httpService1: HttpService,
              private sharedService: SharedService,
              private changeDetectRef: ChangeDetectorRef) {
      this.httpService = httpService1;
      sharedService.pageMenuLabel$.subscribe(value => {
        jQuery('.border-red').removeClass('border-red');
        jQuery('#' + value).addClass('border-red');
      });

      sharedService.loginStatus$.subscribe(value => {
        if (this.isLoggedIn !== value){
          this.isLoggedIn = value;
          this.changeDetectRef.detectChanges();
        }
    });
  }
}
