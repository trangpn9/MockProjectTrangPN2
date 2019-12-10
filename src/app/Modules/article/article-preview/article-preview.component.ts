import { Component, OnInit, Input } from '@angular/core';
import { Article, ArticleService } from '../article.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {

  @Input() article: Article;

  constructor(
    private _profileService: ProfileService,
    private router: Router,
    private _articleService: ArticleService,
    private _loginService: LoginService
  ) { }

  ngOnInit() {        
  }

  setProrileUser(event, userName) {    
    event.preventDefault();    
    this._profileService.setCurrentProfile(userName);
    return this.router.navigate(['/', 'profile', userName]);
  }

  onFavorite() {
    let isLogin = this._loginService.checkLogin().value;
    if (isLogin) {      
      if (this.article.favorited) {
        this.article.favorited = !this.article.favorited;
        this.article.favoritesCount--;
        return this._articleService.unFavoriteBySlug(this.article.slug);
      } else {
        this.article.favorited = !this.article.favorited;
        this.article.favoritesCount++;
        return this._articleService.favoriteBySlug(this.article.slug);
      }
    } else {
      return this.router.navigate(['/', 'login']);
    }
    
  }
  
}
