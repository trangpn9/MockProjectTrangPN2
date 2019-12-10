import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { Author } from '../article/article.service';
import { BehaviorSubject } from 'rxjs';

export interface Comment {
  author: Author;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _API: string = '';
  private _comments: BehaviorSubject<Comment[]>;

  constructor(private _loginService: LoginService, private http: HttpClient) {
    this._API = this._loginService.getAPI();
    this._comments = <BehaviorSubject<Comment[]>> new BehaviorSubject([]);
  }

  getAllCommentBySlug(slug) {
    return this.http.get(`${this._API}articles/${slug}/comments`).subscribe((data: any) => {
      return this._comments.next(data);
    });
  }

  getComments() {
    return this._comments;
  }

  deleteCommentById(slug, id) {
    let headers = this._loginService.setTokenRequest();
    return this.http.delete(`${this._API}articles/${slug}/comments/${id}`, headers);
  }

  postCommentBySlug(slug, content) {
    let headers = this._loginService.setTokenRequest();
    const body = {
      "comment": {
        "body": content
      }
    }
    
    return this.http.post(`${this._API}articles/${slug}/comments`, body, headers);
  }
}
