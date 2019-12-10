import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  bio: string;
  image: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _API: string = "https://conduit.productionready.io/api/";
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _currentUser = new BehaviorSubject<User>({    
    id: 0,
    email: '',
    createdAt: '',
    updatedAt: '',
    username: '',
    bio: '',
    image: '',
    token: '',
  });

  constructor(private http: HttpClient) { }

  getAPI() {
    return this._API;
  }

  loginUser(user) {        
    return this.http.post(`${this._API}users/login`, user);
  }

  checkLogin() {
    return this._isLoggedIn;
  }

  setCheckLogin() {
    this.setCurrentUser();
    return this._isLoggedIn.next(true);
  }

  setTokenRequest() {    
    let currentToken = localStorage.getItem('jwtToken');    
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Token ${currentToken}`
      })
    };
    
    return _httpOptions;
  }

  private setCurrentUser() {        
    let headers = this.setTokenRequest();
    this.http.get(`${this._API}user`, headers).subscribe((data) => {      
      this._currentUser.next(data['user']);
    });
    return;
  }

  getCurrentUser() {      
    return this._currentUser;    
  }

  hanldeLogout() {
    localStorage.clear();
    this._isLoggedIn.next(false);
  }

}
