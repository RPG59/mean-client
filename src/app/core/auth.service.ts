import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, filter, switchMap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  token: string;
  user: any;
  apiUrl = 'http://localhost:8085';
  httpOptions: { headers: HttpHeaders };
  isUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    console.log(this.token);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token || ''
      })
    };
    if (!this.user) {
      this.setUserProfile();
    } else {
      this.isUpdate$.next(false);
    }
  }


  setUserProfile(): void {
    this.http.post(this.apiUrl + '/profile', {}, this.httpOptions)
      .subscribe((res: Res) => {
        console.log(res);
        if (!res.success) {
          return;
        }
        this.user = res.user;
        console.log(this.user);
        this.isUpdate$.next(false);
      });
  }

  login(login: string, password: string): Observable<any> {
    const postData = {
      login: login,
      password: password
    };
    return this.http.post('http://localhost:8085/login', postData, this.httpOptions)
      .pipe(
        map((res: Res) => {
          console.log(res);
          if (!res.success) {
            return res;
          }
          this.user = res.user;
          this.storedToken(res.token);
          return res;
        }));
  }

  logout(): void {
    localStorage.setItem('token', null);
    this.token = null;
    this.user = null;
  }

  storedToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  registration(login: string, email: string, password: string): any {
    const postData = {
      username: login,
      email: email,
      password: password
    };

    return this.http.post(this.apiUrl + '/registration', postData, this.httpOptions)
      .pipe(
        map((res: Res) => {
          console.log(res);
          if (!res.success) {
            return res;
          }
          this.user = res.user;
          this.storedToken(res.token);
          return res;
        }));
  }
}

class Res {
  success: boolean;
  status: string;
  user?: any;
  token?: string;
}
