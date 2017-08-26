import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Note } from "../../note";

@Component({
  selector: 'hp-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  @Input() notes: Array<Note>;
  @Output() newNote = new EventEmitter<string>();

  newNoteContent: string;

  saveNote() {
    this.newNote.emit(this.newNoteContent);
    this.newNoteContent = '';
  }
}
