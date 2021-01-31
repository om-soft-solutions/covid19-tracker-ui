import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  alertType: string;

  constructor() { }

  ngOnInit(): void {
  }

  displayAlert(alertText): void{
    jQuery('#alertText').html(alertText);
    jQuery('.alert').fadeIn();
    window.setTimeout(() => {
      jQuery('.alert').fadeOut();
    }, 2000);
  }
}
