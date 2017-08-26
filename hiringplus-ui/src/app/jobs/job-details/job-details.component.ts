import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from "../job";

@Component({
  selector: 'hp-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  job: Job;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: JobService) {

  }

  ngOnInit() {
    this.service.getJobs().subscribe(jobs => {

    });
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.service.getJobs().subscribe(jobs => {
          this.job = jobs.find(job => job.id === id);
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToCandidate(id: number) {
    this.router.navigate(['/candidate', id]);
  }

}
