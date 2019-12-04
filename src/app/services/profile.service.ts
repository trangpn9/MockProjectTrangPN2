import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

export interface PorfileUser {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _API: string = '';

  constructor(private _loginService: LoginService, private http: HttpClient) {
    this._API = this._loginService.getAPI();
  }

  getCurrentProfile(username: string) {
    username = username.replace('@', '');

    return this.http.get(`${this._API}profiles/${username}`);
  }
}
