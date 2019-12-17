import { Component, OnInit } from '@angular/core';
import { ScrollAutoService } from './services/scroll-auto.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

import { ArticleService } from './Modules/article/article.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  timer: any;  
  
  constructor(
    private _scrollSevice: ScrollAutoService, 
    private _loginService: LoginService, 
    private router: Router,
    private articleService: ArticleService,    
  ) {
    this._loginService.checkLogin().subscribe((data) => {      
      if (data == true) {
        this.timer = setInterval(this.logOut, 10000)  

        //Reset time when event onclick
        document.getElementsByTagName('body')[0].onclick = () => {                    
          if (this._loginService.checkLogin().value == true) {
            this.clearLogout();
            this.resetTime();
          }     
        };
        
        //Reset time when event mouse moving
        document.getElementsByTagName('body')[0].onmousemove = () => {
          if (this._loginService.checkLogin().value == true) {
            this.clearLogout();
            this.resetTime();
          } 
        }

        //Reset time when event keypress
        document.getElementsByTagName('body')[0].onkeyup = () => {
          if (this._loginService.checkLogin().value == true) {
            this.clearLogout();
            this.resetTime();
          }  
        }
      } else {
        this.clearLogout();
      }
    });    
  }

  ngOnInit() {
    this._scrollSevice.setScrollTop();
  }  

  logOut = () => {       
    this._loginService.hanldeLogout();
    alert('This is Function Auto Logout! Now we come back home! Thanks!');      
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });     

    return;
  }

  clearLogout() {    
    return clearInterval(this.timer);
  }

  resetTime() {         
    this.timer = setInterval(this.logOut, 10000);          
  }

}
