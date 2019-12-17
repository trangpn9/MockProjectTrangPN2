import { Component, OnInit, Input } from '@angular/core';
import { ArticleService, Article, Articles } from '../article.service';
import { LoginService } from 'src/app/services/login.service';

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
  currentTag: string = '';
  currPage: number = 0;
  feedToggle: string = 'globalFeed';
  notFeed: boolean = false;

  constructor(private articleService: ArticleService, private _loginService: LoginService) { }

  ngOnInit() {        
    if(this.isLogin) {      
      this.feedToggle = 'yourFeed'
      this.getYourFeed();
    } else {            
      this.feedToggle = 'globalFeed';
      this.getGlobalArticle();
    }

    this.articleService.getAllTags().subscribe((data: any) => {
      const { tags } = data;
      this.tags = tags;
    });
  }

  selectTag(event, tag) {
    event.preventDefault();
    this.currPage = 0;

    this.currentTag = tag;
    this.feedToggle = 'tag';

    this.articleService.getArticlesByTag(tag).subscribe((data: Articles) => {
      this.handlePagination(data);
    });    
  }

  onClickFeed(event, feed) {
    event.preventDefault();
    this.currPage = 0;
    this.feedToggle = feed    
  
    if (feed === 'globalFeed') {
      this.currentTag = '';
      this.getGlobalArticle();
    }    
  }

  handlePagination = (data: Articles) => {
    const { articles, articlesCount } = data;
    this.articles = articles;
    this.totalArticles = articlesCount;

    this.totalPage = Math.ceil(articlesCount / articles.length);
    this.numbers = Array(this.totalPage).fill(0).map((x, i) => i);
  }

  getGlobalArticle = () => {
    this.notFeed = false;
    this.articleService.getAllArticles().subscribe((data: Articles) => {
      this.handlePagination(data);
    });
  }

  getYourFeed() {
    this.articleService.getArticleFeed().subscribe((data: Articles) => {      
      if (data['articles']['length'] > 0) {
        this.notFeed = false;
        this.handlePagination(data);
      } else {
        this.notFeed = true;
      }
      
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
