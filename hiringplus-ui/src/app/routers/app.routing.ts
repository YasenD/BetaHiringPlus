/**
 * Created by hyadav on 1/21/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {AuthGuard} from '../guards/auth.guard';
import {LoginComponent} from '../login/login.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(appRoutes);
