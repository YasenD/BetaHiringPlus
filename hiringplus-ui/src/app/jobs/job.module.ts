import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListComponent } from './job-list/job-list.component';
import { AddJobComponent } from "app/jobs/add-job/add-job.component";
import { JobService } from './job.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AuthGuard } from '../guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    JobDetailsComponent,
    AddJobComponent,
    JobListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {path: 'job', component: JobListComponent, canActivate: [AuthGuard]},
      {path: 'add-job', component: AddJobComponent, canActivate: [AuthGuard]},
      {path: 'job/:id', component: JobDetailsComponent, canActivate: [AuthGuard]}
    ]),
    InfiniteScrollModule
  ],
  providers: [
    JobService
  ]
})
export class JobModule { }
