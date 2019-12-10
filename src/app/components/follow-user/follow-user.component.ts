import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.css']
})
export class FollowUserComponent implements OnInit {

  @Input() username: string;
  @Input() following: boolean;  

  constructor(private _loginService: LoginService, private router: Router, private _profileService: ProfileService) { }

  ngOnInit() {
  }

  onFollow() {
    let isLogin = this._loginService.checkLogin().value;
    if (isLogin) {
      if (this.following) {        
        this._profileService.unFollowUser(this.username);
      } else {        
        this._profileService.followUser(this.username);
      }
    } else {
      return this.router.navigate(['/', 'login']);
    }
  }

}
