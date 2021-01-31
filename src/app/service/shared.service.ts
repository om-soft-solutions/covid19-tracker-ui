import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService{
  pageMenuLabel = new Subject<string>();
  loginStatus = new Subject<boolean>();

  pageMenuLabel$ = this.pageMenuLabel.asObservable();
  loginStatus$ = this.loginStatus.asObservable();

  activeLabel(label: string): void{
    this.pageMenuLabel.next(label);
  }
}
