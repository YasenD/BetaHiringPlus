import { Component, OnInit } from '@angular/core';
import { UserService } from "../accounts/user.service";
import { DashboardData } from "../accounts/dashboardData";

@Component({
  selector: 'hp-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  dashboardData: DashboardData;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getDashboardData().subscribe(dashboarData => this.dashboardData = dashboarData);
  }

}
