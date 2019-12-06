import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  currentArticle: Article = {
    slug: 'string',
    title: 'string',
    description: 'string',
    body: 'string',
    tagList: [''],
    createdAt: 'string',
    updatedAt: 'string',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  };

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      let slug = data.slug;
      if(slug) {
        this.articleService.getArticleBySlug(slug).subscribe((data: any) => {
          console.log(data);
          const { article } = data;
          this.currentArticle = article;
        });
      }
      
    });
  }

}
