import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean
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

export interface Articles {
  articles: Article[];
  articlesCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _API: string = '';
  private _cacheRequest: string = '';
  private _offset: number = 10;

  constructor(private _loginService: LoginService, private http: HttpClient) {
    this._API = this._loginService.getAPI();
  }

  getAllTags() {
    return this.http.get(`${this._API}tags`);
  }

  getAllArticles() {
    this._cacheRequest = `${this._API}articles?limit=10`;
    this._offset = 10;

    return this.http.get(`${this._API}articles?limit=10`);
  }

  getArticlesByTag(tag) {   
    this._cacheRequest = `${this._API}articles?limit=10&tag=${tag}`;
    this._offset = 10;

    return this.http.get(`${this._API}articles?limit=10&tag=${tag}`);
  }

  getArticlesByOffset(page) {
    let num = parseInt(page, 10) * this._offset;

    return this.http.get(`${this._cacheRequest}&offset=${num}`);
  }

  getCacheRequest() {
    return this._cacheRequest;
  }

  getListArticleByUsername(username: string) {
    username = username.slice(1);
    this._offset = 5;
    this._cacheRequest = `${this._API}articles?author=${username}&limit=5`;

    return this.http.get(`${this._API}articles?author=${username}&limit=5`);
  }

  getFavoritesArticleByUsername(username: string) {
    username = username.slice(1);
    this._offset = 5;
    this._cacheRequest = `${this._API}articles?favorited=${username}&limit=5`;

    return this.http.get(`${this._API}articles?favorited=${username}&limit=5`);
  }
}
