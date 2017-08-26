import { Component, OnInit } from '@angular/core';
import {CandidateService} from '../candidate.service';
import {Candidate} from '../candidate';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'hp-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  title = 'Candidates';
  candidates: Candidate[];
  errorMessage: string;
  loadingMoreCandidates = true;


  constructor(private service: CandidateService,
              private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    let id: number = +this.route.snapshot.params['userId'];
    this.service.getCandidatesByUserId(id)
      .subscribe(candidates => {
          this.candidates = candidates;
          this.loadingMoreCandidates = false;
        },
        error => this.errorMessage = <any> error);
  }

  getCandidate(id: number) {
    this.router.navigate(['/candidate', id]);
  }

  onNewReminder(event, candidate) {
    this.service.saveReminder(+this.route.snapshot.params['userId'], candidate.id, event);
  }

  onScroll () {
    this.loadingMoreCandidates = this.service.fetchNextPageOfCandidates();
  }

}
