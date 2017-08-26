import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable, Subject, BehaviorSubject} from 'rxjs';

import 'rxjs/add/operator/map';
import {User} from './user';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  public token: string;
  private subject: Subject<User>;

  constructor(private http: Http, private router: Router) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.subject = new BehaviorSubject<User>(currentUser);
  }

  login( email: string, password: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      return this.http.post(environment.loginUrl, JSON.stringify({email: email, password: password}), options)
        .map((response: Response) => {
          console.log('Gets the response back:: ' + JSON.stringify(response.headers));
          let user: User = <User> response.json();
          let token = response.headers && response.headers.get('X-Auth-Token');
          if (token) {
            this.token = token;
            const currentUser = {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              token: token,
              accountId: user.accountId
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.subject.next(currentUser);
            return true;
          } else {
            return false;
          }
        }).catch(error => Observable.of(false));
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.subject.next();
    this.router.navigate(['/login']);
  }

  getStatus(): Observable<any> {
    // return observable to be notified of status updates (login/logout)
    return this.subject.asObservable();
  }

}
