import {Injectable} from '@angular/core';

declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class NotifyService{

  constructor() {
  }

  displayAlert(alertType: string, alertMessage: string): void{
    jQuery('body').append('<div style="position: fixed;right: 20px;top: 30px; display: none" id="notification" class="alert ' + alertType + '">\n' +
      '  <p id="alertText">' + alertMessage + '</p>\n' +
      '</div>\n');
    jQuery('#notification').fadeIn(400);
    if (window.document.body.offsetWidth < 992){
      jQuery('#notification').css({left: '20px'});
    }else{
      jQuery('#notification').css({left: 'auto'});
    }
    window.setTimeout(() => {
      jQuery('#notification').fadeOut(400, () => jQuery('#notification').remove());
    }, 2000);
  }

}
