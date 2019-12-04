import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this._loginService.hanldeLogout();
    this.router.navigate(['/']);
    return;
  }
}
