import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article, Articles } from 'src/app/Modules/article/article.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  articles: Article[] = [];
  totalArticles: number = 0;
  totalPage: number = 0;
  numbers: number[] = [];
  currPage: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {    
    this.activatedRoute.params.subscribe((data: any) => {
      const { username } = data;
      
      this.articleService.getFavoritesArticleByUsername(username).subscribe((data: Articles) => {                       
        const { articles, articlesCount } = data;
        if (articles.length > 0) {                    
          this.articles = articles;
          this.totalArticles = articlesCount;
      
          this.totalPage = Math.ceil(articlesCount / articles.length);
          this.numbers = Array(this.totalPage).fill(0).map((x, i) => i);          
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
