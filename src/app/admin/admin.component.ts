import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string;
  password: string;
  role: string = "lab_tech";
  ROLES = [{key:"admin",value:"Admin"},{key:"lab_tech","value":"Lab Technician"}]

  constructor(private httpservice: HttpService,
              private router: Router) { }

  ngOnInit(): void {
    sessionStorage.setItem("token","");
    this.httpservice.isLoggedIn=false;
  }

  authenticate(){
    this.httpservice.authenticate(this.username,this.password).subscribe(value => {
      this.httpservice.isLoggedIn=true;
      this.httpservice.username=this.username;
      this.httpservice.password=this.password;
      sessionStorage.setItem("token",btoa(this.username+":"+this.password));
      const role_name = this.ROLES.find(value1 => value1.key==this.role).value;
      this.router.navigate(["/admin"]);
    },error => console.log(error))
  }

}
