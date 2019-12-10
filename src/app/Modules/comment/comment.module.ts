import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormCommentComponent } from "./form-comment/form-comment.component";
import { ListCommentComponent } from "./list-comment/list-comment.component";
import { DetailCommentComponent } from "./detail-comment/detail-comment.component";


@NgModule({
  declarations: [
    FormCommentComponent,
    ListCommentComponent,
    DetailCommentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    FormCommentComponent, 
    ListCommentComponent,
    DetailCommentComponent,
  ]
})
export class CommentModule {}
