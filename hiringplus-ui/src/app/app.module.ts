import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { CandidateModule } from './candidates/candidate.module';
import { JobModule } from "./jobs/job.module";
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { routing } from './routers/app.routing';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './accounts/authentication.service';
import { UserService } from './accounts/user.service';
import { AuthenticatedHttpService } from "./accounts/authenticated-http.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    routing,
    CandidateModule,
    JobModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AuthenticatedHttpService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
