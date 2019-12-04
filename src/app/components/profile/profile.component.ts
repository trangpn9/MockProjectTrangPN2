import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from 'src/app/services/article.service';
import { ProfileService, PorfileUser } from 'src/app/services/profile.service';
import { LoginService, User } from 'src/app/services/login.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUser: PorfileUser = {
    username: '',
    bio: '',
    image: '',
    following: false,
  };
  isFollow: boolean = false;
  articles: Article[] = [];
  myProfile: boolean = false;

  constructor(
    private _profileService: ProfileService, 
    private activatedRoute: ActivatedRoute, 
    private _articleService: ArticleService,
    private _loginService: LoginService,
    private title: Title, private meta: Meta
  ) { }

  ngOnInit() {    
    let userLogin:string = '';

    this.activatedRoute.params.subscribe((param:any) => {
      this._loginService.getCurrentUser().subscribe((data: User) => {      
        userLogin = data.username;
      });

      this._profileService.getCurrentProfile(param.username).subscribe((data:any) => {        
        this.profileUser = data.profile;     
        this.title.setTitle(`@${this.profileUser.username} | Conduit`);
        this.meta.updateTag({
          name: 'description', 
          content: `Conduit : Conduit Profile`
        });       

        if (this.profileUser.username == userLogin) {
          this.myProfile = true;
        } else {
          this.myProfile = false;
        }
      });

      this._articleService.getListArticleByUsername(param.username).subscribe((data:any) => {        
        this.articles = data.articles  
      });
    });

  }

}
