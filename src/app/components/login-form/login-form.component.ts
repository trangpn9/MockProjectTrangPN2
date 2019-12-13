import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  titleForm: string = '';
  loginForm: boolean = true;
  loginErr;
  loginFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private _loginSevice: LoginService, 
    private router: Router
  ) {
    this.loginFormGroup = fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    let getPath = this.route.snapshot.routeConfig.path;
    if (getPath == 'login') {
      this.titleForm = 'Sign in';
      this.loginForm = true;
    } else if (getPath == 'register') {
      this.titleForm = 'Sign up';
      this.loginForm = false;
    }
    this.checkLogin();
  }

  checkLogin() {
    if (localStorage.getItem('jwtToken')) {      
      this.router.navigate(['/']);
    }
  }

  login() {
    let user: object = {
      "user": {
        "email": this.loginFormGroup.value['email'],
        "password": this.loginFormGroup.value['password']
      }
    };

    this._loginSevice.loginUser(user).subscribe((data) => {                  
      localStorage.setItem('jwtToken', data['user']['token']);      
      this._loginSevice.setCheckLogin();
      this.router.navigate(['/']);
    }, (err) => {      
      this.loginErr = err.error.errors;
    });    
  }

  register() {    
    let userInfo = {
      "user":{
        "username": this.loginFormGroup.value['userName'],
        "email": this.loginFormGroup.value['email'],
        "password": this.loginFormGroup.value['password']
      }
    }
    
    this._loginSevice.signUp(userInfo).subscribe((data:any) => {
      const { user } = data;
      localStorage.setItem('jwtToken', user.token);      
      this._loginSevice.setCheckLogin();
      this.router.navigate(['/']);
    }, (err) => {      
      this.loginErr = err.error.errors;
    });
  }

}
