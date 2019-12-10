import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let isLogin = this._loginService.checkLogin().value;    

    if (isLogin != true) {
      return this.http.get(`${this._API}profiles/${name}`).subscribe((data: any) => {                      
        this._currentProfile.next(data.profile);      
      });
    }
    
    let headers = this._loginService.setTokenRequest();
    return this.http.get(`${this._API}profiles/${name}`, headers).subscribe((data: any) => {                      
      this._currentProfile.next(data.profile);      
    });
  }

  getCurrentProfile() {
    return this._currentProfile;
  }
 
  followUser(name) {
    let headers = this._loginService.setTokenRequest();           
    return this.http.post(`${this._API}profiles/${name}/follow`, null, headers).subscribe((data: any) => {                      
      this._currentProfile.next(data.profile);      
    });
  }

  unFollowUser(name) {
    let headers = this._loginService.setTokenRequest();    
    return this.http.delete(`${this._API}profiles/${name}/follow`, headers).subscribe((data: any) => {                      
      this._currentProfile.next(data.profile);      
    });
  }

}
