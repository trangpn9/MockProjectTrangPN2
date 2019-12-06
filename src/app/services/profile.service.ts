import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface ProfileUser {
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
  private _currentProfile = new BehaviorSubject<ProfileUser>({    
    username: '',
    bio: '',
    image: '',
    following: false,
  });

  constructor(private _loginService: LoginService, private http: HttpClient) {
    this._API = this._loginService.getAPI();
  }

  setCurrentProfile(username: string) {            
    let name = username.slice(1);

    this.http.get(`${this._API}profiles/${name}`).subscribe((data: any) => {                      
      this._currentProfile.next(data.profile);      
    });
    
  }

  getCurrentProfile() {
    return this._currentProfile;
  }

}
