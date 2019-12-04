import { Component, OnInit, Input } from '@angular/core';
import { ArticleService, Article, Articles } from '../article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {

  @Input() isLogin: boolean;
  articles: Article[] = [];
  totalArticles: number = 0;
  tags: string[] = [];
  totalPage: number = 0;
  numbers: number[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAllArticles().subscribe((data: Articles) => {
      const { articles, articlesCount } = data;
      this.articles = articles;      
      this.totalArticles = articlesCount;
      
      this.totalPage = Math.ceil(articlesCount / articles.length);          
      this.numbers = Array(this.totalPage).fill(0).map((x,i)=>i);
    });

    this.articleService.getAllTags().subscribe((data: any) => {
      const { tags } = data;
      this.tags = tags;
    });
  }

  selectTag(event, tag) {
    event.preventDefault();
    console.log(tag);
    this.articleService.getArticlesByTag(tag).subscribe((data: Articles) => {
      const { articles, articlesCount } = data;
      this.articles = articles;      
      this.totalArticles = articlesCount;
      
      this.totalPage = Math.ceil(articlesCount / articles.length);          
      this.numbers = Array(this.totalPage).fill(0).map((x,i)=>i);
    });
  }

}
