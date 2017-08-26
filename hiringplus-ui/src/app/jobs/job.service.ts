import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticatedHttpService } from '../accounts/authenticated-http.service';
import { Observable, Subject } from 'rxjs';
import { environment } from "../../environments/environment";
import { Job } from "./job";

@Injectable()
export class JobService {

  private jobs: Subject<Job[]> = new Subject();

  constructor(private authenticatedHttp: AuthenticatedHttpService) {
  }

  getJobs(): Observable<Job[]> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticatedHttp
      .get(environment.jobUrl + 'account/' + currentUser.accountId +'/jobs')
      .map((response: Response) => <Job[]> response.json())
      .subscribe(jobs => {
        this.jobs.next(jobs);
      });

    return this.jobs.asObservable();
  }

  saveJob(job: Job) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticatedHttp
      .post(environment.jobUrl + 'user/' + currentUser.id +'/job', job)
      .map(data => data.json())
      .subscribe(savingResult => {
        console.log('saved successfully');
        this.getJobs();
      });
  }
}
