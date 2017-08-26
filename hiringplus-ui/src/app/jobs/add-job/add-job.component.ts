import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from "../job";

@Component({
  selector: 'hp-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit, OnDestroy {

  model = new Job();
  skill1: String;
  skill2: String;
  skill3: String;
  skill4: String;
  skill5: String;
  skill6: String;
  skill7: String;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: JobService) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  saveJob() {
    this.model.skills = [];
    for (let i = 1; i <= 7; i++) {
      const skill = this['skill' + i];
      if (skill) {
        this.model.skills.push({name: skill});
      }
      this['skill' + i] = null;
    }

    this.model.minSalary = parseInt((this.model.minSalary + '').replace(/[^0-9]/g, ''), 10);
    this.model.maxSalary = parseInt((this.model.maxSalary + '').replace(/[^0-9]/g, ''), 10);

    this.service.saveJob(this.model);
    this.model = new Job();
    this.router.navigate(['/job']);
  }

}
