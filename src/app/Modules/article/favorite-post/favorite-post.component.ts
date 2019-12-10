import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-favorite-post',
  templateUrl: './favorite-post.component.html',
  styleUrls: ['./favorite-post.component.css']
})
export class FavoritePostComponent implements OnInit {

  @Input() favoritesCount: number;
  @Input() favorited: boolean;
  @Input() slug: string;

  constructor(private _loginService: LoginService, private router: Router, private _articleService: ArticleService) { }

  ngOnInit() {
  }

  onFavorite() {
    let isLogin = this._loginService.checkLogin().value;
    if (isLogin) {
      if (this.favorited) {        
        return this._articleService.unFavoriteBySlug(this.slug);
      } else {                      
        return this._articleService.favoriteBySlug(this.slug);
      }
    } else {
      return this.router.navigate(['/', 'login']);
    }
  }

}
