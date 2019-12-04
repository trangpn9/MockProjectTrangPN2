import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditorComponent } from './components/editor/editor.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './services/guard/auth.guard';
import { ArticleModule } from './Modules/article/article.module';


const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: LoginFormComponent },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  
  { path: 'profile/:username', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [    
    HomeComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    EditorComponent,
    SettingsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ArticleModule
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
