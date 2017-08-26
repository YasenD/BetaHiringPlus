import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './accounts/authentication.service';
import {User} from './accounts/user';

@Component({
  selector: 'hp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hp works!';
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.getStatus().subscribe(currentUser => this.currentUser = currentUser);
  }

  logout() {
    this.authenticationService.logout();
  }
}
