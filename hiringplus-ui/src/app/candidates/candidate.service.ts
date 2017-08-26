import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticatedHttpService } from '../accounts/authenticated-http.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Candidate } from './candidate';
import { Note } from './note';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { current } from 'codelyzer/util/syntaxKind';
import { Job } from '../jobs/job';

@Injectable()
export class CandidateService {
  private candidates: ReplaySubject<Candidate[]> = new ReplaySubject(1);
  private candidate: ReplaySubject<Candidate> = new ReplaySubject(1);
  private lastCandidates;
  private lastCandidate;
  private lastUserId;
  private lastPageOfCandidates;
  private totalPagesOfCandidates;

  constructor(private authenticatedHttp: AuthenticatedHttpService) {
  }

  getCandidatesByUserId(userId: number): Observable<Candidate[]> {
    this.lastUserId = userId;
    this.authenticatedHttp.get(environment.userUrl + userId + '/candidatesPaged')
      .map((response: Response) => <Candidate[]> response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(handleError)
      .subscribe(page => {
        this.candidates.next(page.content);
        this.lastCandidates = page.content;
        this.lastPageOfCandidates = page.number;
        this.totalPagesOfCandidates = page.totalPages;
      });

    return this.candidates.asObservable();
  }

  fetchNextPageOfCandidates() {
    if (!this.totalPagesOfCandidates || this.lastPageOfCandidates >= this.totalPagesOfCandidates - 1) {
      return false;
    }

    const nextPage = this.lastPageOfCandidates + 1;
    this.lastPageOfCandidates = nextPage;
    this.authenticatedHttp.get(environment.userUrl + this.lastUserId + '/candidatesPaged?page=' + nextPage)
      .map((response: Response) => <Candidate[]> response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(handleError)
      .subscribe(page => {
        const newAllCandidates = this.lastCandidates.concat(page.content);

        this.candidates.next(newAllCandidates);
        this.lastCandidates = newAllCandidates;
        this.lastPageOfCandidates = page.number;
        this.totalPagesOfCandidates = page.totalPages;
      });

    return true;
  }

  getCandidate(id: number): Observable<Candidate> {
    if (!this.lastCandidate || this.lastCandidate.id !== id) {
      this.fetchCandidate(id).subscribe(candidate => {
        this.candidate.next(candidate);
        this.lastCandidate = candidate;
      });
    }

    return this.candidate.asObservable();
  }

  saveNote(candidateId: number, content: string) {
    this.authenticatedHttp.post(`${environment.candidateUrl}${candidateId}/note`, content)
      .map(data => data.json())
      .subscribe(note => {
        const updatedCandidate = Object.assign({}, this.lastCandidate);
        updatedCandidate.notes = this.lastCandidate.notes.slice();
        updatedCandidate.notes.unshift(note);
        this.candidate.next(updatedCandidate);
        this.lastCandidate = updatedCandidate;
      });
  }

  saveReminder(userId: number, candidateId: number, date: Date) {
    const reminderDate = moment(date).format('MM/DD/YYYY');
    this.authenticatedHttp.post(`${environment.userUrl}/${userId}/candidate/${candidateId}/reminder`, {reminderDate})
      .map(data => data.json())
      .subscribe(reminder => {
        const updatedCandidates = this.lastCandidates.slice();
        const candidateIndex = updatedCandidates.findIndex(candidate => candidate.id === candidateId);
        updatedCandidates[candidateIndex] = Object.assign({}, updatedCandidates[candidateIndex], {reminder});
        this.candidates.next(updatedCandidates);
        this.lastCandidates = updatedCandidates;
      });
  }

  saveJobCandidate(candidateId: number, job: Job) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticatedHttp.post(`${environment.accountUrl}/${currentUser.accountId}/jobCandidate`, {candidateId, jobId: job.id})
      .map(data => data.json())
      .subscribe(jobCandidate => {
        const updatedCandidate = Object.assign({}, this.lastCandidate);
        updatedCandidate.jobs = this.lastCandidate.jobs.slice();
        updatedCandidate.jobs.unshift(job);
        this.candidate.next(updatedCandidate);
        this.lastCandidate = updatedCandidate;
      });
  }

  updateCandidateField(candidateId: number, field: string, value: any) {
    const requestObject = {};
    requestObject[field] = value;

    this.authenticatedHttp.put(`${environment.candidateUrl}${candidateId}`, requestObject)
      .map(data => data.json())
      .subscribe(updateResult => {
        const updatedCandidate = Object.assign({}, this.lastCandidate);
        updatedCandidate[field] = value;
        this.candidate.next(updatedCandidate);
        this.lastCandidate = updatedCandidate;
      });
  }

  private fetchCandidate(id: number) {
    return this.authenticatedHttp.get(environment.candidateUrl + id)
      .map((response: Response) => <Candidate> response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(handleError);
  }

}

const handleError = (error: Response) => {
  console.error(error);
  return Observable.throw(error.json().error || 'Server error');
};
