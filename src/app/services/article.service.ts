import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;

}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _API: string = '';
  currentUser: string = '';

  constructor(private _loginService: LoginService, private http: HttpClient) {
    this._API = this._loginService.getAPI();
  }

  getListArticleByUsername(username: string) {
    username = username.replace('@', '');
    return this.http.get(`${this._API}articles?author=${username}`);
  }

}
