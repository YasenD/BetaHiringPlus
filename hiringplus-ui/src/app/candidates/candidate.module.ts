import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateService } from './candidate.service';
import { UploadService } from './upload.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AuthGuard } from '../guards/auth.guard';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from './candidate-details/notes/notes.component';
import { EmailsComponent } from './candidate-details/emails/emails.component';
import { ReminderComponent } from './candidate-list/reminder/reminder.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfViewerComponent } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    CandidateDetailsComponent,
    CandidateListComponent,
    NotesComponent,
    EmailsComponent,
    ReminderComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {path: 'user/:userId/candidates', component: CandidateListComponent, canActivate: [AuthGuard]},
      {path: 'candidate/:id', component: CandidateDetailsComponent, canActivate: [AuthGuard]}
    ]),
    InfiniteScrollModule
  ],
  providers: [
    CandidateService,
    UploadService
  ]
})
export class CandidateModule { }
