import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticatedHttpService } from '../accounts/authenticated-http.service';
import { Observable, Subject } from 'rxjs';
import { environment } from "../../environments/environment";
import {CandidateService} from "./candidate.service";

@Injectable()
export class UploadService {

  constructor(private authenticatedHttp: AuthenticatedHttpService, private candidateService: CandidateService) {}

  signUploadRequest(file, candidateId) {
    return this.authenticatedHttp
      .get(environment.uploadUrl + '?fileName=' + file.name)
      .map(data => data.json())
      .subscribe(signingResult => {
        this.uploadFile(file, signingResult, candidateId);
        return signingResult.url;
      });
  }

  uploadFile(file, signingResult, candidateId) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signingResult.signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('upload success');
          this.candidateService.updateCandidateField(candidateId, 'resumeUrl', signingResult.url);
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }
}
