import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {

  @Input() article: Article;

  constructor(private _profileService: ProfileService, private router: Router) { }

  ngOnInit() {        
  }

  setProrileUser(event, userName) {    
    event.preventDefault();    
    this._profileService.setCurrentProfile(userName);
    return this.router.navigate(['/', 'profile', userName]);
  }
  
}
