import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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
  private _currentProfile = new BehaviorSubject<PorfileUser>({    
    username: '',
    bio: '',
    image: '',
    following: false,
  });

  constructor(private _loginService: LoginService, private http: HttpClient) {
    this._API = this._loginService.getAPI();
  }

  getCurrentProfile(username: string) {    
    let name = username.slice(1);

    return this.http.get(`${this._API}profiles/${name}`);
  }
}
