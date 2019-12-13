import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  formSetting: FormGroup;
  idCurrUser: number;

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this._loginService.getCurrentUser().subscribe((data: any) => {      
      this.idCurrUser = data.id;
      this.formSetting = new FormGroup({
        name: new FormControl(data.username, Validators.required),
        image: new FormControl(data.image),
        bio: new FormControl(data.bio),
        email: new FormControl(data.email, Validators.required),
        password: new FormControl(''),
      });
    });
  }

  logout() {
    this._loginService.hanldeLogout();
    this.router.navigate(['/']);
    return;
  }

  updateUser() {
    let profileInfo;
    if (this.formSetting.value.password == '') {
      profileInfo = {
        "user" : {
          "username": this.formSetting.value.name,
          "image": this.formSetting.value.image,
          "bio": this.formSetting.value.bio,
          "email": this.formSetting.value.email,
        }
      }
    } else {
      profileInfo = {
        "user" : {
          "username": this.formSetting.value.name,
          "image": this.formSetting.value.image,
          "bio": this.formSetting.value.bio,
          "email": this.formSetting.value.email,
          "password": this.formSetting.value.password,
        }
      }
    }

    this._loginService.updateProfile(profileInfo).subscribe((data:any) => {
      const { user } = data;      
      this.router.navigate(['/', 'profile', '@'+user.username]);
    }, (err) => {
      console.log('Error: ', err);      
    });
    
  }
}
