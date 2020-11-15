import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Patient} from "../models/patient";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    getOtp(mobOrEmail: string) {

    }

  getPatientDetails(mobOrEmail: string, otp: number): Observable<Patient[]>{
      return this.http.get<Patient[]>("assets/patient.json")
    }

}
