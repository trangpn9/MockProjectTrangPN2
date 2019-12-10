import { Component, OnInit, Input } from '@angular/core';
import { Comment, CommentService } from '../comment.service';
import { LoginService, User } from 'src/app/services/login.service';

@Component({
  selector: 'app-detail-comment',
  templateUrl: './detail-comment.component.html',
  styleUrls: ['./detail-comment.component.css']
})
export class DetailCommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() slug: string;
  isLogin: boolean = false;

  constructor(
    private _loginService: LoginService, 
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this._loginService.getCurrentUser().subscribe((data: User) => {      
      if (this.comment.author.username == data.username) {
        return this.isLogin = true
      }  
      return this.isLogin = false;
    });         
  }

  deleteComment() {    
    return this.commentService.deleteCommentById(this.slug, this.comment.id).subscribe((data) => {
      document.getElementById(this.comment.id.toString()).remove();    
    }); 
  }
}
