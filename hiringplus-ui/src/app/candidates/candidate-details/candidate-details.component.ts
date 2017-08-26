import {Component, OnInit, OnDestroy} from '@angular/core';
import {Candidate} from '../candidate';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidateService} from '../candidate.service';
import {UploadService} from '../upload.service';
import { JobService } from "../../jobs/job.service";
import { Job } from "../../jobs/job";

@Component({
  selector: 'hp-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit, OnDestroy {

  candidate: Candidate;
  jobs: Job[];
  errorMessage: string;
  shortlistSelect;

  private sub: Subscription;
  private jobSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CandidateService,
              private jobService: JobService,
              private uploadService: UploadService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getCandidate(id);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // this.jobSub.unsubscribe();
  }

  getCandidate(id: number) {
    this.service.getCandidate(id).subscribe(
      candidate => {
        this.candidate = candidate;
        this.jobService.getJobs()
          .subscribe(jobs => {
            this.jobs = jobs.filter(job => !this.candidate.jobs.find(candidateJob => candidateJob.id === job.id));
          });
      },
      error =>  this.errorMessage = <any>error);
  }

  onNewNote(event) {
    this.service.saveNote(this.candidate.id, event);
  }

  onShortlist(event) {
    this.service.saveJobCandidate(this.candidate.id, this.jobs.find(job => job.id === event.value));
    this.shortlistSelect = undefined;
  }

  onBack() {
    this.router.navigate([`/user/${this.candidate.userId}/candidates`]);
  }

  onEditableFieldChange(event, field) {
    if (event.target.validity.valid) {
      this.service.updateCandidateField(this.candidate.id, field, event.target.value);
    }
  }

  uploadResume() {
    const files = (<HTMLInputElement>document.getElementById('uploadResumeInput')).files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    this.uploadService.signUploadRequest(file, this.candidate.id);
  }

  clearResume() {
    this.service.updateCandidateField(this.candidate.id, 'resumeUrl', '');
  }

}
