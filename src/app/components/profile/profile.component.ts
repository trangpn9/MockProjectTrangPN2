import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService, ProfileUser } from 'src/app/services/profile.service';
import { LoginService, User } from 'src/app/services/login.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUser: ProfileUser;
  following: boolean = false;
  username: string = '';
  myProfile: boolean = false;
  currListArticle: string = 'myArticle';

  constructor(
    private _profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _loginService: LoginService,
    private title: Title, private meta: Meta
  ) { }

  ngOnInit() {
    let userLogin: string = '';
    let currentUser: string = '';
    let checkURL = this.router.url.includes('favorites');                

    currentUser = this.activatedRoute.firstChild.snapshot.params['username'];

    this._loginService.getCurrentUser().subscribe((data: User) => {
      userLogin = data.username;
    });
    this._profileService.setCurrentProfile(currentUser);

    this._profileService.getCurrentProfile().subscribe((data: ProfileUser) => {
      this.profileUser = data;
      this.username = this.profileUser.username;
      this.following = this.profileUser.following;    
      if (checkURL == true) {
        this.currListArticle = 'favorArticle';
      } else {
        this.currListArticle = 'myArticle';
      }      
            
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
  }

  changeListArticle(listArticle) {
    return this.currListArticle = listArticle;
  }
}
