import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { Reminder } from '../../reminder';

@Component({
  selector: 'hp-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReminderComponent {

  @Input() value: Reminder;
  @Output() newDate = new EventEmitter<Date>();

  popoverVisible = false;

  public get displayValue() {
    return this.value ? this.value.reminderDate : null;
  }

  onIconClick(event: Event) {
    this.close();
  }

  onTomorrowClick() {
    this.newDate.emit(moment().add(1, 'days').toDate());
    this.close();
  }

  onOneWeekClick() {
    this.newDate.emit(moment().add(7, 'days').toDate());
    this.close();
  }

  onOneMonthClick() {
    this.newDate.emit(moment().add(1, 'months').toDate());
    this.close();
  }

  onCustomDateSubmit(event) {
    this.newDate.emit(moment(event.target.value).toDate());
    this.close();
  }

  close() {
    this.popoverVisible = !this.popoverVisible;
  }

}
