import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLogin: boolean = false;
  currentUser: string = '';
  currentImage: string = '';
  constructor(private activatedRoute: ActivatedRoute, private _loginService: LoginService, private router: Router, private _profileService: ProfileService,) { }

  ngOnInit() {
    if (localStorage.getItem('jwtToken')) {
      this._loginService.setCheckLogin();
    }
    
    this._loginService.checkLogin().subscribe((data) => {      
      this.isLogin = data;      
    });

    this._loginService.getCurrentUser().subscribe((data) => {                        
      this.currentUser = data['username'];
      if (data['image'] != null) {
        this.currentImage = data['image'];
      } else {
        this.currentImage = '';
      }
      
    });
  }

  goSetting(event) {
    event.preventDefault();

    let currentUser = '@'+this.currentUser;
    this._profileService.setCurrentProfile(currentUser);
    return this.router.navigate(['/', 'profile', currentUser]);
  }
}
