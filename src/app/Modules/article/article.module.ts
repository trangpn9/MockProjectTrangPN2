import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListArticleComponent } from './list-article/list-article.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';

@NgModule({
  declarations: [
    ListArticleComponent, 
    ArticlePreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ListArticleComponent,
    RouterModule,
  ]
})
export class ArticleModule { }
