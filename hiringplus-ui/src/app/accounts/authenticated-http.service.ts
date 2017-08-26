import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthenticatedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      options.headers.set('X-AUTH-TOKEN', currentUser.token);
    } else {
      url.headers.set('X-AUTH-TOKEN', currentUser.token);
    }

    return super.request(url, options).catch((error: Response) => {
      if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
        console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
        localStorage.removeItem('currentUser');
        window.location.href = window.location.href + '?' + new Date().getMilliseconds();
      }
      return Observable.throw(error);
    });
  }
}
