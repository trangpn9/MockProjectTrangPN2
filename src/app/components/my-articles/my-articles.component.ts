import { Component, OnInit } from '@angular/core';
import { Article, ArticleService, Articles } from 'src/app/Modules/article/article.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  articles: Article[] = [];
  totalArticles: number = 0;
  totalPage: number = 0;
  numbers: number[] = [];
  currPage: number = 0;
  hasArticle: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService, private _profileService: ProfileService) { }

  ngOnInit() {        
    this.activatedRoute.params.subscribe((data: any) => {      
      const { username } = data;      

      this.articleService.getListArticleByUsername(username).subscribe((data: Articles) => {        
        const { articles, articlesCount } = data;        
        if (articlesCount > 0) {
          this.hasArticle = true;
          this.articles = articles;
          this.totalArticles = articlesCount;
      
          this.totalPage = Math.ceil(articlesCount / articles.length);
          this.numbers = Array(this.totalPage).fill(0).map((x, i) => i);
        } else {
          this.hasArticle = false;
        }
        
      });
    });        
  }

  changePage(event, number) {
    event.preventDefault();    
    this.currPage = number;

    this.articleService.getArticlesByOffset(number).subscribe((data: Articles) => {
      const { articles } = data;
      this.articles = articles;
    });

    return window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
