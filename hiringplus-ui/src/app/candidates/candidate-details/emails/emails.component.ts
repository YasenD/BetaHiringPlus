import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Note } from "../../note";

@Component({
  selector: 'hp-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent {

  dummyEmails: Array<any>;

  constructor() {
    this.dummyEmails = [
    ];
  }

}
