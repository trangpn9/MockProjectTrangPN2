import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ListArticleComponent } from './list-article/list-article.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FavoritePostComponent } from './favorite-post/favorite-post.component';
import { FollowUserComponent } from 'src/app/components/follow-user/follow-user.component';
import { CommentModule } from '../comment/comment.module';
import { ButtonEditorComponent } from 'src/app/components/button-editor/button-editor.component';
import { MarkedPipe } from 'src/app/pipes/marked.pipe';


@NgModule({
  declarations: [
    MarkedPipe,
    ListArticleComponent,
    ArticlePreviewComponent,
    ArticleDetailComponent,
    FavoritePostComponent,
    FollowUserComponent,
    ButtonEditorComponent,    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CommentModule
  ],
  exports: [
    RouterModule,
    ListArticleComponent,    
    ArticlePreviewComponent,
    ArticleDetailComponent,
    FavoritePostComponent,
    FollowUserComponent,
    ButtonEditorComponent,
  ]
})
export class ArticleModule { }
