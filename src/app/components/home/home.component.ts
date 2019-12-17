import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  
  isLogin: boolean = false;  

  constructor(private _loginService: LoginService, private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle('Home | Conduit');
    this.meta.updateTag({
      name: 'description', 
      content: `Conduit : Conduit Homepage`
    });

    this._loginService.checkLogin().subscribe((data) => {
      this.isLogin = data;
    });
  }

}
