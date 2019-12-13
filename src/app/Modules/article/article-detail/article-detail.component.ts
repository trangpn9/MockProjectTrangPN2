import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService, Article } from '../article.service';
import { Title, Meta } from '@angular/platform-browser';
import { LoginService, User } from 'src/app/services/login.service';
import { error } from 'util';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  currentArticle: Article = {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  };

  username: string = '';
  following: boolean = false;
  favorited: boolean = false;
  favoritesCount: number = 0;
  slug: string = '';
  isLogin: boolean = false;
  image: string;
  isEditor: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private articleService: ArticleService,
    private _loginService: LoginService,
    private router: Router,
    private title: Title, private meta: Meta
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      let slug = data.slug;
      this.slug = slug;
      if (slug) {
        this.articleService.getArticleBySlug(slug).subscribe((data: any) => {
          const { article } = data;
          this.currentArticle = article;
          this.username = this.currentArticle.author.username;
          this.following = this.currentArticle.author.following;
          this.favorited = this.currentArticle.favorited;
          this.favoritesCount = this.currentArticle.favoritesCount;     
          this.image = this.currentArticle.author.image;     
          
          this.title.setTitle(`${this.currentArticle.title} | Conduit`);
          this.meta.updateTag({
            name: 'description',
            content: `Conduit : Conduit ${this.currentArticle.description}`
          });
          
          this._loginService.getCurrentUser().subscribe((data: User) => {            
            if(this.currentArticle.author.username == data.username) {
              return this.isEditor = true;
            }        

            return this.isEditor = false;
          })
        }, (error) => {          
          alert("Article not exist!");           
          this.router.navigate(['/']);
        });
      }

      this.isLogin = this._loginService.checkLogin().value;

    });
  }

  onFollow() {
    this.following = !this.following;
  }

  onFavorite() {
    if (this.favorited) {
      this.favorited = !this.favorited;
      this.favoritesCount--;
    } else {
      this.favorited = !this.favorited;
      this.favoritesCount++;
    }
  }



}
