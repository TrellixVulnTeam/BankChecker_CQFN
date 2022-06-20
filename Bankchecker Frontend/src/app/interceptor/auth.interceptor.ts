import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { environment } from 'src/environments/environment';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public authenticationService: AuthenticationService | undefined;
  constructor(authenticationService: AuthenticationService) { }
  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(environment.apiUrl + "/user/login") ||
      httpRequest.url.includes(environment.apiUrl + "/user/register")) {
      return httpHandler.handle(httpRequest);
    }
    var token;
    var request = httpRequest.clone();
    if (localStorage.getItem("token") != null) {
      token = localStorage.getItem("token");
      request = httpRequest.clone({ setHeaders: { Authorization: "Bearer " + token } });
    }
    return httpHandler.handle(request);
  }
}
