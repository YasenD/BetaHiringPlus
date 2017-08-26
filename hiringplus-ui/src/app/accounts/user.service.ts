import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {AuthenticationService} from './authentication.service';
import { AuthenticatedHttpService } from '../accounts/authenticated-http.service';
import {Observable} from 'rxjs';
import {User} from './user';
import { DashboardData } from "./dashboardData";

import 'rxjs/add/operator/map';
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {
  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private authenticatedHttp: AuthenticatedHttpService) { }

  getUsers(): Observable<User[]> {
    let headers = new Headers({ 'Authorization': this.authenticationService.token });
    let options = new RequestOptions({headers: headers});

    return this.http.get('/api/users', options)
          .map((response: Response) => response.json());
  }

  getDashboardData(): Observable<DashboardData> {
    return this.authenticatedHttp.get(environment.dashboardUrl).map(response => response.json());
  }

}
