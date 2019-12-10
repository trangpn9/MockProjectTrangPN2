import { Component, OnInit, Input } from '@angular/core';
import { CommentService, Comment } from '../comment.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  @Input() slug: string;
  comments: Comment[] ;

  constructor(private commentService: CommentService, private _loginService: LoginService) { }

  ngOnInit() {    
    this.commentService.getAllCommentBySlug(this.slug);

    this.commentService.getComments().subscribe((data: any) => {      
      const { comments } = data;
      this.comments = comments;
    });
    
  }

}
