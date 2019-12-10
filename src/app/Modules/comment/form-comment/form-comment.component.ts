import { Component, OnInit, Input } from '@angular/core';
import { LoginService, User } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.css']
})
export class FormCommentComponent implements OnInit {

  @Input() slug:string;

  image: string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  commentFormGroup: FormGroup;

  constructor(
    private _loginService: LoginService,
    private commentService: CommentService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.commentFormGroup = fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._loginService.getCurrentUser().subscribe((data: User) => {
      const { image } = data;
      this.image = image;
    });
  }

  postComment() {    
    let content = this.commentFormGroup.value.content;
    this.commentService.postCommentBySlug(this.slug, content).subscribe((data) => {
      this.commentService.getAllCommentBySlug(this.slug);
    });
    this.commentFormGroup.reset();

  }

}
