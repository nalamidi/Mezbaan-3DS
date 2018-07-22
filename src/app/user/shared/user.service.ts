import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

export interface LoginData {
  email: string,
  password: string,
}

@Injectable()
export class UserService {
  private username: string;
  private token: string;
  private avatarUrl: string;
  private userId: string;

  constructor(private http: HttpClient) {}

  private saveToken(token) {
    localStorage.setItem('bwm_auth', JSON.stringify(token));
    return token;
  }

  private parseJwt (token) {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

    return {};
  }

  private getToken(): string {
    if (this.token) return this.token;

    if (this.isAuthenticated()) {
      return this.token = JSON.parse(localStorage.getItem('bwm_auth')).token;
    }

    return '';
  }


  public register(user: User): Observable<any> {
    return this.http.post('/api/v1/users', user);
  }

  public login(loginData: LoginData): Observable<any> {
    return this.http.post('/api/v1/auth', loginData).map(token => this.saveToken(token));
  }

  public isAuthenticated(): boolean {
    // Check if token is not expired
    return !!localStorage.getItem('bwm_auth');
  }

  public getProfile(id: string): Observable<any> {
    let url='/api/v1/profile/' + id;
    return this.http.get(url);
  }

  public logout(): Observable<any> {
    localStorage.removeItem('bwm_auth');
    this.token = '';
    this.username = '';
    this.avatarUrl= '';
    this.userId = '';

    return new Observable(observer => {
      if (!!localStorage.getItem('bwm_auth')) {
        observer.error(new Error("Token not removed"));
      } else {
        observer.next();
      }
    });
  }

  public getUsername(): string {
    if (this.username) return this.username;

    return this.username = this.parseJwt(this.getToken()).username;
  }

  public getId(): string {
    if (this.userId) return this.userId;

    return this.userId = this.parseJwt(this.getToken()).userId;
  }

  public getThree(): {} {
    if (this.userId) return {userId: this.userId, username: this.username, avatarUrl: this.avatarUrl};

    return {userId: this.parseJwt(this.getToken()).userId, username: this.parseJwt(this.getToken()).username, avatarUrl: this.parseJwt(this.getToken()).avatarUrl};
  }

  public getUseravatar(): string {
    if (this.avatarUrl) return this.avatarUrl;

    return this.avatarUrl = this.parseJwt(this.getToken()).avatarUrl;
  }

  public getAuthToken(): any {
    const auth = localStorage.getItem('bwm_auth');

    return auth ? `Bearer ${JSON.parse(auth).token}` : '';
  }
}
