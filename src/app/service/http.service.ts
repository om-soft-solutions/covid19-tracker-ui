import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Patient} from '../models/patient';
import {Observable} from 'rxjs';
import {GenericResponse} from '../models/genericresponse';
import {tap} from 'rxjs/operators';
import {Hospital} from '../models/hospital';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    username: string;
    password: string;
    role: string;
    baseUrl = '/api/v1';
    registerTestURL = '/patient/registerTest';
    adminAuthenticateURL = '/admin/authenticate';
    adminSearchByIdURL = '/admin/searchForPatient';
    updateStatusURL = '/admin/updateStatus';
    getOtpURL = '/patient/getOtp';
    searchForPatientURL = '/patient/searchForPatient';
    hospitalsURL = '/admin/getHospitalList';
    createUserURL = '/admin/createUser';
    changePassURL =  '/admin/updatePassword';
    addHospitalURL =  '/admin/addHospital';
    isLoggedIn = false;
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
      sessionStorage.setItem('token', '');
    }

    getOtp(mobOrEmail: string): Observable<GenericResponse<string>>{
      return this.http.get<GenericResponse<string>>(this.baseUrl + this.getOtpURL, {params: {mobileNumber: mobOrEmail}});
    }

  getPatientDetails(mobOrEmail: string, otp: number): Observable<Patient[]>{
      return this.http.get<Patient[]>('assets/patient.json');
    }

  authenticate(username: string, password: string, role: string): Observable<HttpResponse<any>>{
      const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password), role});
      return this.http.post<HttpResponse<any>>(this.baseUrl + this.adminAuthenticateURL, null, {headers, observe: 'response'});
  }

  registerTest(patient: Patient): Observable<GenericResponse<Patient>> {
    return this.http.post<GenericResponse<Patient>>(this.baseUrl + this.registerTestURL, patient, this.httpOptions);
  }

  searchById(id: string): Observable<GenericResponse<Patient[]>> {
      const headers: HttpHeaders = new HttpHeaders({Authorization: 'Basic ' + sessionStorage.getItem('token')});
      return this.http.post<GenericResponse<Patient[]>>(this.baseUrl + this.adminSearchByIdURL, null, {headers, params: {id}}).pipe(tap(
        data => console.log(data),
        error => console.log(error)
      ));
  }

  updateStatus(patientsList: Patient[]): Observable<GenericResponse<Patient[]>>{
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Basic ' + sessionStorage.getItem('token')});
    return this.http.post<GenericResponse<Patient[]>>(this.baseUrl + this.updateStatusURL, patientsList, {headers});
  }

  searchForPatient(mobileOrEmail: string, otp: number): Observable<GenericResponse<Patient[]>> {
      const params: HttpParams = new HttpParams({fromString: 'mobileOrEmail=' + mobileOrEmail + '&otp=' + otp});
      return this.http.get<GenericResponse<Patient[]>>(this.baseUrl + this.searchForPatientURL, {params});
  }

  getHospitals(): Observable<GenericResponse<Hospital[]>> {
    return this.http.get<GenericResponse<Hospital[]>>(this.baseUrl + this.hospitalsURL);
  }

  createUser(newUser: User): Observable<GenericResponse<string>> {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Basic ' + sessionStorage.getItem('token')});
    return this.http.post<GenericResponse<string>>(this.baseUrl + this.createUserURL, newUser, {headers});
  }

  changePassword(password: string): Observable<GenericResponse<string>> {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Basic ' + sessionStorage.getItem('token')});
    const user = {password};
    return this.http.post<GenericResponse<string>>(this.baseUrl + this.changePassURL, user, {headers});
  }

  addHospital(hospital: Hospital): Observable<GenericResponse<string>> {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Basic ' + sessionStorage.getItem('token')});
    return this.http.post<GenericResponse<string>>(this.baseUrl + this.addHospitalURL, hospital, {headers});
  }
}
