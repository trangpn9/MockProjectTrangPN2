import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListArticleComponent } from './list-article/list-article.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  declarations: [
    ListArticleComponent,
    ArticlePreviewComponent,
    ArticleDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    ListArticleComponent,    
    ArticlePreviewComponent,
    ArticleDetailComponent,
  ]
})
export class ArticleModule { }
