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

  constructor(private _loginService: LoginService, private http: HttpClient) {
    this._API = this._loginService.getAPI();
  }

  getAllTags() {
    return this.http.get(`${this._API}tags`);
  }

  getAllArticles() {
    return this.http.get(`${this._API}articles?limit=10`);
  }

  getArticlesByTag(tag) {   
    return this.http.get(`${this._API}articles?limit=10&tag=${tag}`);
  }
}
