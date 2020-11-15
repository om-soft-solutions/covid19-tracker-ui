import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  mobile: string;
  age: number;
  email: string;
  gender: string='male';

  constructor() { }

  ngOnInit(): void {
  }

}
