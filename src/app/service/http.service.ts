import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Patient} from "../models/patient";
import {Observable} from "rxjs";
import {GenericResponse} from "../models/genericresponse";
import {tap} from "rxjs/operators";
import {CountryCodes} from "../models/countrycodes";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    username: string;
    password: string;
    baseUrl: string = "http://localhost:8081";
    registerTestURL: string = "/patient/registerTest";
    adminAuthenticateURL: string = "/admin/authenticate";
    adminSearchByIdURL:string ="/admin/searchForPatient";
    updateStatusURL:string ="/admin/updateStatus";
    getOtpURL: string = "/patient/getOtp";
    searchForPatientURL="/patient/searchForPatient";
    isLoggedIn: boolean = false;
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
      sessionStorage.setItem('token','');
    }

    getOtp(mobOrEmail: string) : Observable<GenericResponse<string>>{
      return this.http.get<GenericResponse<string>>(this.baseUrl+this.getOtpURL,{params:{mobileNumber:mobOrEmail}})
    }

  getPatientDetails(mobOrEmail: string, otp: number): Observable<Patient[]>{
      return this.http.get<Patient[]>("assets/patient.json")
    }

  authenticate(username:string, password:string):Observable<HttpResponse<any>>{
      const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)});
      return this.http.post<HttpResponse<any>>(this.baseUrl+this.adminAuthenticateURL,null,{headers,observe:"response"});
  }

  registerTest(patient: Patient): Observable<GenericResponse<Patient>> {
    return this.http.post<GenericResponse<Patient>>(this.baseUrl+this.registerTestURL,patient,this.httpOptions);
  }

  searchById(id:string): Observable<GenericResponse<Patient[]>> {
      let headers: HttpHeaders = new HttpHeaders({"Authorization":"Basic "+sessionStorage.getItem('token')})
      return this.http.post<GenericResponse<Patient[]>>(this.baseUrl+this.adminSearchByIdURL,null,{headers:headers,params:{id:id}}).pipe(tap(
        data => console.log(data),
        error => console.log(error)
      ));
  }

  updateStatus(patientsList: Patient[]): Observable<GenericResponse<Patient[]>>{
    let headers: HttpHeaders = new HttpHeaders({"Authorization":"Basic "+sessionStorage.getItem('token')});
    return this.http.post<GenericResponse<Patient[]>>(this.baseUrl+this.updateStatusURL,patientsList,{headers: headers});
  }

  searchForPatient(mobileOrEmail: string, otp: number): Observable<GenericResponse<Patient[]>> {
      let params:HttpParams = new HttpParams({fromString: "mobileOrEmail="+mobileOrEmail+"&otp="+otp});
    console.log(params);
      return this.http.get<GenericResponse<Patient[]>>(this.baseUrl+this.searchForPatientURL,{params: params});
  }

  countryCodesList(): Observable<CountryCodes[]>{
    return this.http.get<CountryCodes[]>("assets/country_codes.json");
  }
}
