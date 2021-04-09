import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { SecurityComponent } from './security/security.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddPostComponent } from './add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    PostComponent,
    SecurityComponent,
    RegistrationComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
