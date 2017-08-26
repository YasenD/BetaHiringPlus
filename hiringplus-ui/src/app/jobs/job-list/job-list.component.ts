import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from "../job";

@Component({
  selector: 'hp-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  states = [];
  jobsData: Job[];
  sortBy = 'date';

  constructor(private service: JobService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.service.getJobs()
      .subscribe(jobs => {
        this.jobsData = jobs;
      });
  }

  goToJob(id: number) {
    this.router.navigate(['/job', id]);
  }

  get jobs() {
    return this.sortBy === 'candidates'
      ? this.jobsData.slice().sort((job1, job2) => job2.shortlistedCandidates.length - job1.shortlistedCandidates.length)
      : this.jobsData;
  }

}
