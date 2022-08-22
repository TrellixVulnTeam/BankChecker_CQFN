import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private token: string = "";
  private loggedInUsername: string = "";
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }
  public login(user: User): Observable<HttpResponse<User>> {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post<User>(this.host + "/api/v1/user/login", user, { observe: 'response', withCredentials: true, headers: headers });
  }
  public register(user: User): Observable<User> {
    return this.http.post<User>(this.host + "/api/v1/user/register", user);
  }
  public validateToken(token: any): Observable<boolean> {
    return this.http.get<boolean>(this.host + "/api/v1/user/validateToken?token="+token);
  }
  public logout(): void {
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem("token", token);
  }
  public addUserToLocalCache(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }
  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user') || "");
  }
  public loadToken(): void {
    this.token = localStorage.getItem("token") || "";
  }
  public getToken(): string {
    return this.token;
  }
  public isLoggedIn(): boolean {
    var isLogged = false;
    this.loadToken()
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          isLogged = true;
        }
      }
    }
    else {
      this.logout();
      isLogged = false;
    }
    return isLogged;
  }
}
